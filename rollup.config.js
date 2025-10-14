import pkg from "./package.json" with { type: "json" };
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import prefixSelector from "postcss-prefix-selector";
import image from "@rollup/plugin-image";
import typescript from "@rollup/plugin-typescript";
import tsConfigPaths from "rollup-plugin-tsconfig-paths";

const config = [
    {
        input: "src/index.tsx",
        output: [
            { file: pkg.main, format: "cjs" },
            { file: pkg.module, format: "esm" },
        ],
        plugins: [
            tsConfigPaths(),
            typescript(),
            commonjs(),
            babel({
                babelHelpers: "bundled",
                exclude: "node_modules/**",
                presets: ["@babel/preset-env", "@babel/preset-react"],
            }),
            postcss({
                plugins: [
                    tailwindcss(),
                    prefixSelector({
                        prefix: ".cc-modal",
                        transform: (prefix, selector, prefixedSelector) => {
                            // Don't prefix if selector already contains .cc-modal
                            if (selector.includes(".cc-modal")) {
                                return selector;
                            }
                            // For global selectors like *, ::backdrop, :root, etc.
                            // scope them inside .cc-modal
                            if (selector.match(/^(\*|::?[\w-]+)(?:\s|,|$)/)) {
                                return prefixedSelector;
                            }
                            // Skip dark mode selectors - Tailwind handles these already with our darkMode config
                            // They come in as .dark\:cc-classname and Tailwind applies the :where selector
                            if (selector.match(/^\.dark\\:/)) {
                                // Check if it's a cc- prefixed class (including negative utilities)
                                if (selector.match(/^\.dark\\:-?cc-/)) {
                                    // Apply dual selector strategy for cc- classes in dark mode
                                    return `${prefix} ${selector}, ${prefix}${selector}`;
                                }
                                // For other dark mode classes, just scope them normally
                                return prefixedSelector;
                            }
                            // Handle responsive/breakpoint selectors (md:, lg:, sm:, etc.)
                            // These are inside media queries so the colon is not escaped
                            if (selector.match(/^\.(?:sm|md|lg|xl|2xl|tab|desktop|tabMax|smallMobile):/)) {
                                // Extract the breakpoint prefix and the actual class
                                const match = selector.match(/^(\.(?:sm|md|lg|xl|2xl|tab|desktop|tabMax|smallMobile):)(.+)/);
                                if (match) {
                                    const [, breakpoint, className] = match;
                                    // Check if it's a cc- prefixed class
                                    if (className.match(/^-?cc-/)) {
                                        // Apply dual selector for cc- classes
                                        return `${prefix} ${selector}, ${prefix}${selector}`;
                                    }
                                }
                                return prefixedSelector;
                            }
                            // For Tailwind utility classes with cc prefix (including negative utilities like .-cc-)
                            // make them work both ON .cc-modal and INSIDE .cc-modal
                            if (selector.match(/^\.-?cc-/)) {
                                return `${prefix}${selector}, ${prefix} ${selector}`;
                            }
                            // For everything else, scope it as a descendant
                            return prefixedSelector;
                        },
                    }),
                    // Rename all Tailwind CSS variables to avoid conflicts
                    {
                        postcssPlugin: "rename-tw-vars",
                        Once(root) {
                            // Add a specific rule for the translate utilities with ALL required variables
                            const translateRule = `
.cc-modal {
  --cc-tw-translate-x: 0;
  --cc-tw-translate-y: 0;
  --cc-tw-rotate: 0;
  --cc-tw-skew-x: 0;
  --cc-tw-skew-y: 0;
  --cc-tw-scale-x: 1;
  --cc-tw-scale-y: 1;
}`;
                            root.append(translateRule);
                        },
                        Declaration(decl) {
                            // Rename --tw- variables to --cc-tw- in property names
                            if (decl.prop.startsWith("--tw-")) {
                                decl.prop = decl.prop.replace(
                                    "--tw-",
                                    "--cc-tw-",
                                );
                            }
                            // Also update any var(--tw-*) references in values
                            if (decl.value.includes("var(--tw-")) {
                                decl.value = decl.value.replace(
                                    /var\(--tw-/g,
                                    "var(--cc-tw-",
                                );
                            }
                        },
                        AtRule: {
                            keyframes(atRule) {
                                // Also handle keyframes that might use tw variables
                                atRule.walkDecls((decl) => {
                                    if (decl.value.includes("var(--tw-")) {
                                        decl.value = decl.value.replace(
                                            /var\(--tw-/g,
                                            "var(--cc-tw-",
                                        );
                                    }
                                });
                            },
                        },
                    },
                ],
                extensions: [".css"],
                minimize: true,
                extract: "styles.css",
            }),
            image(),
            nodeResolve(),
            terser(),
        ],
        external: Object.keys(pkg.peerDependencies),
    },
];

export default config;
