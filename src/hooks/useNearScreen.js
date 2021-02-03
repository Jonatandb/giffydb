import { useEffect, useState, useRef } from 'react'

export default function useNearScreen({ distance = '100px', externalRef, once = true } = {}) {
    const [isNearScreen, setIsNearScreen] = useState(false)
    const fromRef = useRef()

    useEffect(() => {
        let observer

        const element = externalRef ? externalRef : fromRef
        const onChange = (entries, observer) => {
            const el = entries[0]
            if (el.isIntersecting) {
                setIsNearScreen(true)
                once && observer.disconnect()
            } else {
                !once && setIsNearScreen(false)
            }
        }

        Promise.resolve(
            typeof IntersectionObserver !== 'undefined'
                ? IntersectionObserver
                : import('intersection-observer')  /* For IE compatibility */
        ).then(() => {
            if (element.current) {
                observer = new IntersectionObserver(onChange, { rootMargin: distance })
                observer.observe(element.current)
            }
        })

        return () => observer && observer.disconnect()
    })

    return { isNearScreen, fromRef }
}