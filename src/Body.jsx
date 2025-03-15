import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import { getRecipeFromChefClaude, getRecipeFromMistral } from "./ai"


export default function Main() {
    const [ingredients, setIngredients] = React.useState(['checkin', 'corn', 'heavy cream', 'pasta'])
    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        const recipeResponse = await getRecipeFromMistral(ingredients)
        console.log(recipeResponse)
        setRecipe(recipeResponse)

    }
    const recipeSection = React.useRef(null)
    React.useEffect(() => {
        if(recipe && recipeSection){
            recipeSection.current.scrollIntoView({behavior: 'smooth'})
        }

    }, [recipe])

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}