import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#212121' },
        // secondary: { main: '#D8A31A' },
        // third: { main: '#B4CCFF' },
        // fourth: { main: '#F1F1E6' },
        

        // primary: {
        //   light: palette.primary[ 300 ],
        //   main: palette.primary[ 500 ],
        //   dark: palette.primary[ 700 ],
        //   contrastText: getContrastText(palette.primary[ 500 ]),
        // },
        // secondary: {
        //   light: palette.secondary.A200,
        //   main: palette.secondary.A400,
        //   dark: palette.secondary.A700,
        //   contrastText: getContrastText(palette.secondary.A400),
        // },
        // error: {
        //   light: palette.error[ 300 ],
        //   main: palette.error[ 500 ],
        //   dark: palette.error[ 700 ],
        //   contrastText: getContrastText(palette.error[ 500 ]),
        // },



        
        // text: {
        //     primary: '#31405c',
        // },
        // background: {
        //     default: '#333333',
        // }

        type: 'dark'
    },
    typography: {
        fontFamily: [
            '"Montserrat"',
            '"Source Sans Pro"',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'Roboto',
            '"Helvetica Neue"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        button: {
            textTransform: 'none',
        },
    },
    overrides: {
        MuiButton: {
            textPrimary: {
                color: 'white',
                fontSize: '0.875rem',
            },
            textSecondary: {
                color: '#ffffffbb',
                fontSize: '0.75rem'
            },
            containedPrimary: {
                backgroundColor: '#191919',
                color: '#4edfff',
                fontSize: '1rem',
                '&:hover': {
                    backgroundColor: '#272727'
                }
            },
            containedSecondary: {
                backgroundColor: '#333333',
                color: 'white',
                fontSize: '1rem',
                '&:hover': {
                    backgroundColor: '#191919'
                }
            },
            containedThird: {
                backgroundColor: '#c4c4c4',
                color: 'black',
                fontSize: '1rem',
                '&:hover': {
                    backgroundColor: '#a4a4a4'
                }
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: '#212121'
            }
        },
        MuiCard: {
            root: {
                backgroundColor: '#6c6c6c'
            }
        },
        MuiCardMedia: {
            root: {
                backgroundColor: '#c4c4c4'
            }
        },
        MuiFab: {
            primary: {
                backgroundColor: '#4edfff',
                '&:hover': {
                    backgroundColor: '#3bb0ca'
                }
            }
        },
        MuiFormControl: {
            root: {
                borderLeft: '2px solid #ffffffb3',
                padding: '8px 16px',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
                '&:focus-within': {
                    backgroundColor: '#333333',
                    borderLeftColor: '#4edfff'
                },
                '&:hover': {
                    backgroundColor: '#333333'
                }
            },
            fullWidth: {
                width: 'calc(100% - 32px)'
            }
        },
        MuiInputLabel: {
            root:{ 
                padding: '8px 16px',
                transition: 'color 0.3s ease'
            },
            focused: {
                color: '#4edfff'
            },
            shrink: {
                color: '#ffffffb3',
                '&.Mui-focused': {
                    color: '#4edfff',
                }
            }
        },
        MuiMenu: {
            paper: {
                maxHeight: '80%'
            }
        }
    },
});

export default theme;