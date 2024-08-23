// Function to generate a random integer between min and max
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random pet ID
const petId = getRandomInt(500, 10000);

// Define a pet object with dummy data
export const pet = {
    id: petId, // Randomly generated pet ID
    category: {
        id: petId, // Same ID as pet for consistency
        name: "Dog" // Realistic category name
    },
    name: "Buddy", // Realistic pet name
    photoUrls: [
        "https://example.com/photos/buddy1.jpg", // Example photo URL
        "https://example.com/photos/buddy2.jpg"  // Example photo URL
    ],
    tags: [
        {
            id: getRandomInt(1, 100), // Random tag ID for diversity
            name: "Friendly" // Example tag
        },
        {
            id: getRandomInt(101, 200), // Another random tag ID
            name: "Energetic" // Example tag
        }
    ],
    status: "available" // Pet status
};
