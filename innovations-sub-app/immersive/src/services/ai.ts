     * @returns The generated text response
    */
    async generateText(prompt: string): Promise < any > {
    try {
        const response = await fetch(`${this.baseUrl}/gemini`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if(!response.ok) {
    throw new Error(`Gemini API Error: ${response.statusText}`);
}

return await response.json();
        } catch (error) {
    console.error('Failed to generate text:', error);
    throw error;
}
    }

    /**
     * Generate a texture using Bria AI
     * @param prompt Description of the texture
     * @returns The URL of the generated texture
     */
    async generateTexture(prompt: string): Promise < any > {
    try {
        const response = await fetch(`${this.baseUrl}/bria`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, type: 'texture' }),
        });

        if(!response.ok) {
    throw new Error(`Bria API Error: ${response.statusText}`);
}

return await response.json();
        } catch (error) {
    console.error('Failed to generate texture:', error);
    throw error;
}
    }
}

export const aiService = new AIService();
