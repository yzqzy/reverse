export const uniform = (start, end) => Math.random() * (end - start + 1) + start

export const randint = (start, end) => Math.floor(uniform(start, end))
