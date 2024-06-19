import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import CrossIcon from "@assets/svgIcons/cross-icon.svg";

import { cn } from "./utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "cc-fixed cc-inset-0 cc-z-50 cc-bg-black/40 data-[state=open]:cc-animate-in data-[state=closed]:cc-animate-out data-[state=closed]:cc-fade-out-0 data-[state=open]:cc-fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "cc-rootStyle cc-font-manrope cc-antialiased cc-fixed cc-flex cc-flex-col cc-left-1/2 cc-top-1/2 cc-z-50 cc-w-full cc-max-w-[784px] cc-h-screen sm:cc-h-[90vh] sm:cc-max-h-[90vh] cc-overflow-auto -cc-translate-x-1/2 -cc-translate-y-1/2 cc-border cc-border-outline-base_em cc-bg-white cc-text-high_em cc-shadow-lg cc-duration-200 sm:cc-rounded-[20px] sm:cc-min-h-0",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  closeButtonClass,
  onCloseModal,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  closeButtonClass?: string;
  onCloseModal?: () => void;
}) => (
  <div
    className={cn(
      "cc-flex cc-items-center cc-gap-3 cc-text-center sm:cc-text-left cc-p-4 cc-bg-surface-surface_1 sm:cc-rounded-t-2xl",
      className
    )}
    {...rest}
  >
    {children}
    <DialogPrimitive.Close
      onClick={onCloseModal}
      className={cn(
        "cc-rounded-xl cc-h-10 cc-w-10 cc-shrink-0 cc-flex cc-items-center cc-justify-center cc-opacity-70 cc-ring-offset-background cc-transition-opacity hover:cc-opacity-100 focus:cc-outline-none focus:cc-ring-2 focus:cc-ring-ring focus:cc-ring-offset-2 disabled:cc-pointer-events-none data-[state=open]:cc-bg-accent data-[state=open]:cc-text-muted-foreground cc-ml-auto",
        closeButtonClass
      )}
    >
      <img
        src={CrossIcon}
        alt="CrossIcon"
        className="cc-h-[18px] cc-w-[18px]"
      />
    </DialogPrimitive.Close>
  </div>
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "cc-p-4 cc-border-t cc-bg-white cc-border-outline-low_em sm:cc-shadow-modal-footer-top",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "cc-text-xl cc-font-semibold cc-leading-none cc-tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("cc-text-sm cc-text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
