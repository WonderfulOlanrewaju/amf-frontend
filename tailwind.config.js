module.exports = {
    variants: {
        opacity: ['responsive', 'hover', 'focus', 'disabled'],
        borderWidth: ['responsive', 'even', 'odd', 'hover', 'focus'],
    },
    theme: {
        fontSize: {
            'xs': '.75rem',
            'sm': '.875rem',
            'tiny': '.875rem',
            'base': '1rem',
            'lg': '1.125rem',
            'xl': '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
            'Banner': '7rem',
        }
        // },
        // screens: {
        //     'sm': { 'max': '639px' },
        //     'md': { 'max': '767px' },
        //     'lg': { 'max': '1023px' },
        //     'xl': { 'max': '1279px' },
        // }
    },
    variant: {},
    plugins: []
}