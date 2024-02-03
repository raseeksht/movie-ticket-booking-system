export function dateParse(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}/${month}/${day}`

}

export function sha256(message) {
    return new Promise((resolve,reject)=>{
        const buffer = new TextEncoder().encode(message)
    
        window.crypto.subtle.digest('SHA-256', buffer).then(hash => {
            // Convert the ArrayBuffer to a hexadecimal string
            const hashedData = Array.from(new Uint8Array(hash))
                .map(byte => byte.toString(16).padStart(2, '0'))
                .join('')
            resolve(hashedData)
        }).catch(error => {
            reject("error")
        })
    })

}