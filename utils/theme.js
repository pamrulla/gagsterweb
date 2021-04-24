const theme = {
    blackOverlay: "#000000aa",
    primary: "gray.900",
    primary800: "gray.800",
    primary700: "gray.700",
    primary600: "gray.600",
    primary500: "gray.500",
    primary400: "gray.400",
    primary300: "gray.300",
    primary200: "gray.200",
    primary100: "gray.100",
    secondary: "green.400",
    button: {
        primary: {
            color: ["white", "white", "white", "white"],
            bg: ["gray.700", "gray.700", "gray.700", "gray.700"],
            _hover: {
                bg: ["gray.600", "gray.600", "gray.600", "gray.600"],
            }
        },
        secondary: {
            color: ["white", "white", "white", "white"],
            bg: ["green.400", "green.400", "green.400", "green.400"],
            _hover: {
                bg: ["green.600", "green.600", "green.600", "green.600"],
            }
        },
        other: {
            color: ["black", "black", "black", "black"],
            bg: ["gray.300", "gray.300", "gray.300", "gray.300"],
            _hover: {
                bg: ["gray.600", "gray.600", "gray.600", "gray.600"],
            }
        }
    }
}

export default theme
