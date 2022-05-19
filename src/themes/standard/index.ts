import components from './../standard/components';
import palette from './../standard/palette';
import typography from './../standard/typography';

export default {
    theme: {
        palette,
        typography,
        breakpoints: {
            values: {
                xs: 0,
                sm: 800,
                md: 1280,
                lg: 1366,
                xl: 1920
            }
        }
    },
    overrideStyleFn: components
};
