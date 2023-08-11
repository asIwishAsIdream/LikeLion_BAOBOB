const fetchDataBasedOnCategory = async (selectedCategory) => {
    try {
        const postData = {
            category_name: selectedCategory,
            is_main: "True"
        };

        const response = await fetch("YOUR_BACKEND_API_ENDPOINT", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error.message);
    }
};

