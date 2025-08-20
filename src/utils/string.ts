/**
 * Generate initials from a user's name
 * @param name - The full name to generate initials from
 * @returns The initials (max 2 characters, uppercase)
 * 
 * @example
 * generateInitials("John Doe") // "JD"
 * generateInitials("Jane Mary Smith") // "JM" 
 * generateInitials(" Extra Spaces ") // "ES"
 * generateInitials("SingleName") // "S"
 */
export const generateInitials = (name: string): string => {
  return name
    .trim()                    // Remove leading/trailing spaces
    .split(" ")                // Split by spaces
    .map((word) => word.charAt(0).toUpperCase()) // Take first char of each word, uppercase
    .join("")                  // Join together
    .substring(0, 2);          // Take only first 2 initials
};