import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Palette, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TourStep {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export interface OnboardingTourProps {
    onComplete?: () => void;
    className?: string;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({
    onComplete,
    className,
}) => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [isOpen, setIsOpen] = React.useState(true);

    // Check localStorage on mount to maybe suppress it?
    // The user request did NOT include this logic, so I will omit it to be faithful to the request.
    // However, I will add a check for the user's sake if they didn't realize it.
    // Actually, let's just stick to the requested code.

    const steps: TourStep[] = [
        {
            title: "Welcome to Vibe Styles",
            description:
                "Discover a world of stunning design components and templates that will transform your creative projects.",
            icon: <Sparkles className="h-12 w-12 text-primary" />,
        },
        {
            title: "Customizable Themes",
            description:
                "Choose from a variety of beautiful themes and customize every aspect to match your brand perfectly.",
            icon: <Palette className="h-12 w-12 text-primary" />,
        },
        {
            title: "Lightning Fast",
            description:
                "Built with performance in mind. Experience blazing fast load times and smooth interactions.",
            icon: <Zap className="h-12 w-12 text-primary" />,
        },
    ];

    const totalSteps = steps.length;

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsOpen(false);
            onComplete?.();
        }
    };

    const handleSkip = () => {
        setIsOpen(false);
        onComplete?.();
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={cn("fixed inset-0 z-50 flex items-center justify-center font-sans", className)}>
            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleSkip}
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative z-10 w-full max-w-md rounded-2xl border bg-background p-8 shadow-2xl"
            >
                {/* Step Indicator */}
                <div className="mb-6 flex justify-center space-x-2">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                index === currentStep
                                    ? "w-8 bg-primary"
                                    : index < currentStep
                                        ? "w-2 bg-primary/50"
                                        : "w-2 bg-muted"
                            )}
                        />
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Icon */}
                        <div className="flex justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15,
                                    delay: 0.1,
                                }}
                                className="rounded-full bg-primary/10 p-6"
                            >
                                {steps[currentStep].icon}
                            </motion.div>
                        </div>

                        {/* Title */}
                        <div className="text-center">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                {steps[currentStep].title}
                            </h2>
                        </div>

                        {/* Description */}
                        <p className="text-center text-muted-foreground">
                            {steps[currentStep].description}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Actions */}
                <div className="mt-8 flex items-center justify-between gap-3">
                    <Button
                        variant="ghost"
                        onClick={handleSkip}
                        className="text-muted-foreground"
                    >
                        Skip
                    </Button>

                    <div className="flex gap-2">
                        {currentStep > 0 && (
                            <Button variant="outline" onClick={handlePrevious}>
                                Previous
                            </Button>
                        )}
                        <Button onClick={handleNext} className="group">
                            {currentStep === totalSteps - 1 ? "Get Started" : "Next"}
                            <ArrowRight
                                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                aria-hidden="true"
                            />
                        </Button>
                    </div>
                </div>

                {/* Step Counter */}
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    {currentStep + 1} of {totalSteps}
                </div>
            </motion.div>
        </div>
    );
};

export default function OnboardingTourDemo() {
    const [showTour, setShowTour] = React.useState(true);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold">Vibe Styles Demo</h1>
                <p className="mb-8 text-muted-foreground">
                    Click the button below to restart the onboarding tour
                </p>
                <Button onClick={() => setShowTour(true)} size="lg">
                    Show Onboarding Tour
                </Button>
            </div>

            {showTour && (
                <OnboardingTour
                    onComplete={() => {
                        setShowTour(false);
                        console.log("Onboarding completed!");
                    }}
                />
            )}
        </div>
    );
}
