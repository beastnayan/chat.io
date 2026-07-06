
    let timer;
    function Debounce(func, delay) {


        return function (...args) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func(...args)

            }, delay)
        }
    }


export default Debounce;