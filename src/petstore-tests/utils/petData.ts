export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const petId = getRandomInt(500, 10000);

export const pet = {
    id: petId,
    category: {
        id: petId, 
        name: "Dog" 
    },
    name: "Buddy", 
    photoUrls: [
        "https://example.com/photos/buddy1.jpg", 
        "https://example.com/photos/buddy2.jpg" 
    ],
    tags: [
        {
            id: getRandomInt(1, 100),
            name: "Friendly" 
        },
        {
            id: getRandomInt(101, 200),
            name: "Energetic"
        }
    ],
    status: "available"
};
