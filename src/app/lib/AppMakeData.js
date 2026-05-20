import namor from 'namor'

const range = len => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

export const RemoteData = (...lens) => {
    let age = 10;
    let visits = 10;
    let progress = 10;
    let status = ['single','complicated','relationship'];
    let data = () => {
        age += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        progress += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        
        return {             
            firstName: namor.generate({ words: 1, numbers: 0 }), 
            lastName: namor.generate({ words: 1, numbers: 0 }), 
            visits: visits,
            status: status[Math.ceil(Math.random() * 2)],
            progress: progress,
            age: age
        };
    }   

    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        const start = (lens[0] * lens[1]);
        return range(len).map(d => {
            return {
                ...data(),
                id : start + (d + 1)
            }
        })
    }

    return makeDataLevel()
}

export const AreaGraphData = (...lens) => {
    let visits = 10;
    let data = () => {        
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        return {             
            name: namor.generate({ words: 1, numbers: 0 }), 
            value: visits 
        };
    }

    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return range(len).map(d => {
            return {
                ...data(),
                date: new Date(2018, 0, d), 
                id : d + 1,
                //subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined, /* sub contents */
            }
        })
    }

    return makeDataLevel()
}

export const PersonData = (...lens) => {
    
    let data = () => {
        const statusChance = Math.random();
        return {
            firstName: namor.generate({ words: 1, numbers: 0 }),
            lastName: namor.generate({ words: 1, numbers: 0 }),
            age: Math.floor(Math.random() * 30),
            visits: Math.floor(Math.random() * 100),
            status:
                statusChance > 0.66
                ? 'relationship'
                : statusChance > 0.33
                ? 'complicated'
                : 'single',
            progress: Math.floor(Math.random() * 100),
        };
    }

    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return range(len).map(d => {
            return {
                ...data(),
                id : d + 1,
                //subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined, /* sub contents */
            }
        })
    }

    return makeDataLevel()
}