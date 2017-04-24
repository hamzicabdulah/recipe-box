"use strict";

const React = require('react');
const ReactDOM = require('react-dom');

const Recipe = React.createClass({
	render: function() {
		return (
			<div className='recipe'>
        {/*The openFunc function is passed to the recipe in the RecipeBox component and opens the recipe in a modal view*/}
				<div className='img' onClick={this.props.openFunc} style={{backgroundImage: 'url(' + this.props.image + '), url(http://www.foodista.com/sites/default/files/default_images/placeholder_rev.png)'}}>
				</div>
				<div className='recipe-text'>
					<h2>{this.props.name}</h2>
					<div className='buttons'>
            <button onClick={this.props.openFunc}>Open</button>
            {/*The editFunc function is passed to the recipe in the RecipeBox component and opens the edit/new modal*/}
						<button onClick={this.props.editFunc}>Edit</button>
            {/*The removeFunc function is passed to the recipe in the RecipeBox component and removes the recipe from the recipes array in the RecipeBox component's state*/}
						<button onClick={this.props.removeFunc}>Delete</button>
					</div>
				</div>
			</div>
		);
	}
});

const RecipeBox = React.createClass({
	getInitialState: function() {
		return {
			recipes: [
        //3 recipes are generally in the recipes array and will be displayed when the website is initially visited. The id's are randomly generated.
				{
					id: Math.floor(Math.random() * 9999999),
					name: 'Lasagne',
					ingredients: ['3 tbsp olive oil', '2 celery sticks, finely chopped', '1 onion, finely chopped', '1 carrot (about 100g/4oz) finely chopped', '3 garlic cloves, crushed', '140g pack cubetti di pancetta', '500g pack beef mince', '500g pack pork mince or British veal mince', '200ml milk', '2 x 400g cans chopped tomatoes'],
					image: 'https://barilla.azureedge.net/~/media/images/en_us/hero-images/oven-ready-lasagna.jpg',
          directions: 'First infuse the milk for the béchamel sauce. Put the milk, onion, bay and cloves into a large saucepan and bring very gently just up to the boil. Turn off the heat and set aside for 1 hr to infuse. For the meat sauce, put the oil, celery, onion, carrot, garlic and pancetta in another large saucepan. Gently cook together until the veg are soft but not coloured. Tip in all the mince, the milk and tomatoes. Using a wooden spoon, stir together and break up and mash the lumps of mince against the sides of the pan. When the mince is mostly broken down, stir in all the herbs, the stock cubes and wine, and bring to a simmer. Cover and cook for 1 hr, stirring occasionally to stop the bottom catching. Uncover and gently simmer for another 30 mins-1 hr until the meat is tender and saucy. Taste and season. \nTo finish the béchamel, strain the milk through a fine sieve into one or two jugs. Melt the butter in the same pan then, using a wooden spoon, mix in the flour and cook for 2 mins. Stir in the strained milk, a little at a time – the mix will thicken at first to a doughy paste, but keep going, adding milk gradually to avoid lumps. When all the milk is in, bring to a gentle simmer, stirring constantly (if you have lumps, give it a quick whisk). Gently bubble for a few mins until thickened. Season with salt, pepper and nutmeg. \nHeat oven to 180C/160C fan/gas 4. Spread a spoonful of the meat sauce over the base of a roughly 3.5 litre baking dish. Cover with a single layer of pasta sheets, snapping them to fit if needed, then top with a quarter of the béchamel. Spoon over a third of the meat sauce and scatter over a little Parmesan. Repeat the layers – pasta, béchamel, meat and Parmesan – two more times to use all the meat sauce. Add a final layer of pasta, the last of the béchamel and remaining Parmesan. Sit the dish on a baking tray to catch spills and bake for 1 hr until bubbling, browned and crisp on top.'
				},
				{
					id: Math.floor(Math.random() * 9999999),
					name: 'Hamburger',
					ingredients: ['750g beef mince (like topside)', '70g (1 cup) breadcrumbs, made from day-old bread', '1 large brown onion, grated', '1 egg, lightly whisked', '1/4 cup chopped fresh continental parsley', '2 garlic cloves, crushed'],
					image: 'https://cdn.daysoftheyear.com/wp-content/images/hamburger-day1-e1432469030785-808x382.jpg',
          directions: 'Brown hamburger meat in 12-inch skillet or 5-quart Dutch oven; drain. Stir in hot water, milk, both packets Sauce Mix and uncooked Pasta. Heat to boiling, stirring occasionally. Reduce heat; cover and simmer about 13 minutes, stirring occasionally, until pasta is tender. Remove from heat (sauce will thicken as it stands). Crumble 1½ pounds hamburger meat into 3-quart microwavable casserole or bowl. Microwave uncovered on High 5 to 7 minutes, breaking up beef after 3 minutes, until brown; drain. Stir in both packets Sauce mix, 2-3/4 cups boiling water, 2¼ cups milk and uncooked Pasta. Microwave uncovered on High 14 to 19 minutes, stirring every 7 minutes, until pasta is tender (sauce will thicken as it stands). Dish will be hot.'
				},
				{
					id: Math.floor(Math.random() * 9999999),
					name: 'Pancakes',
					ingredients: ['100g plain flour', '2 large eggs', '300ml milk', '1 tbsp sunflower or vegetable oil, plus a little extra for frying', 'lemon wedges, to serve (optional)', 'caster sugar, to serve (optional)'],
					image: 'http://d2buyft38glmwk.cloudfront.net/ihwph-stacks/media/images/Huckleberrys-My-Dads-Pancakes---Photo-Credit---.original.jpg',
          directions: 'Put the flour, eggs, milk, 1 tbsp oil and a pinch of salt into a bowl or large jug, then whisk to a smooth batter. Set aside for 30 mins to rest if you have time, or start cooking straight away. Set a medium frying pan or crêpe pan over a medium heat and carefully wipe it with some oiled kitchen paper.  When hot, cook your pancakes for 1 min on each side until golden, keeping them warm in a low oven as you go. Serve with lemon wedges and sugar, or your favourite filling. Once cold, you can layer the pancakes between baking parchment, then wrap in cling film and freeze for up to 2 months.'
				}
			],
      //The class of the modal parent is switched between 'modal-container' and 'modal-container-visible' to enable CSS animation when the modal is opened
			modalParentClass: 'modal-container',
      //The class of the button icon is switched between 'add-icon' and 'close-icon' to enable CSS animation when the modal is opened
			iconClass: 'add-icon',
      //currentRecipe is the property of the recipe that's being edited or added through the modal form -- its value gets updated when the user types into the input elements
			currentRecipe: {
				name: '',
				ingredients: [],
				image: '',
        directions:''
			},
      openedRecipe: {
        //currentRecipe is the property of the recipe that's opened and viewed in the modal (read-only) -- its value is updated when the user opens a new recipe
        id: '',
				name: '',
				ingredients: [],
				image: '',
        directions: ''
			}
		};
	},
	componentWillMount: function() {
    //Before the recipe is rendered for the first time, the program checks whether the recipes array exists in the user's local storage. If it does not, it is added to it, and then the program displays the recipes from the local storage on every next website visit
		if (localStorage.getItem('_abdulahhamzic_recipes') === null)
			this.saveToLocalStorage(this.state.recipes);
		this.setState({
			recipes: JSON.parse(localStorage.getItem('_abdulahhamzic_recipes'))
		});
	},
	render: function() {
		return (
			<div>
				<div className='navbar'>
					<span>Recipe Box</span>
				</div>
				<div className='recipes'>
          {/*Every recipe is passed the remove, edit and open functions besides the main properties in order to be able to modify the state of the RecipeBox accordingly
          Arrow functions are used in order to prevent functions from running on render*/}
          {this.state.recipes.map((recipe) =>
						<Recipe id={recipe.id} name={recipe.name} directions={recipe.directions}
						image={recipe.image} removeFunc={() => this.removeRecipe(recipe.id)}
						editFunc={() => this.toggleModal(recipe)}
            openFunc={() => this.openRecipe(recipe)}/>
					)}
				</div>
				<div className='add-new'>
          {/*The class of the modal parent changes between 'modal-container' (the modal is hidden) and 'modal-container-visible' (the modal becomes visible) -- done in CSS*/}
					<div className={this.state.modalParentClass}>
						<div className='modal-bg'></div>
						<div className='modal-add'>
							<form onSubmit={this.saveRecipe}>
                {/*The update functions update the values of the specific properties in the currentRecipe object from the RecipeBox state on typing (onChange)*/}
								<label>Name * <input required value={this.state.currentRecipe.name} onChange={this.updateName} /></label>
								<label>Ingredients (Separated by commas) * <input required value={this.state.currentRecipe.ingredients.join(',')} onChange={this.updateIngredients} /></label>
								<label>Image <input value={this.state.currentRecipe.image} onChange={this.updateImage} /></label>
                <label>Directions * <textarea required value={this.state.currentRecipe.directions} onChange={this.updateDirections} /></label>
								<button>Save</button>
							</form>
						</div>
            <div className='modal-view' ref='modalView'>
              {/*This modal is opened when a user clicks on a recipe -- the information is taken from the openedRecipe state object whose value is changed depending on the recipe passed as a parameter to the function that changes its value (openRecipe function)*/}
							<div className='img' style={{backgroundImage: 'url(' + this.state.openedRecipe.image + '), url(http://www.foodista.com/sites/default/files/default_images/placeholder_rev.png)'}}>
              </div>
              <div className='recipe-text'>
                <h2>{this.state.openedRecipe.name}</h2>
                <h4>Ingredients: </h4>
                <div className='ingredients'>
                  <ul>
                    {this.state.openedRecipe.ingredients.map((ingredient) => <li>{ingredient}</li>)}
                  </ul>
                </div>
                <h4>Directions: </h4>
                <div className='directions'>
                  {this.state.openedRecipe.directions}
                </div>
              </div>
						</div>
					</div>
          {/*This button toggles the modal between opened and closed, and changes its icon accordingly between '+' and 'x'*/}
					<button className='addBtn' onClick={this.toggleModal}><span className={this.state.iconClass}>+</span></button>
				</div>
			</div>
		);
	},
	removeRecipe: function(recipeId) {
    //Filter the state recipes object by returning every recipe that doesn't contain the id passed in as the parameter to the function, and then update the state recipes object
		let recipesUpdated = this.state.recipes.filter((recipe) => recipe.id !== recipeId);
		this.saveToLocalStorage(recipesUpdated);
		this.setState({
			recipes: recipesUpdated
		});
	},
	toggleModal: function(recipe) {
    //If a recipe with an id is passed to the function, it opens the modal to edit the recipe. Else, the form is empty as the user is supposed to add a new recipe
		if (recipe.id) {
			let recipeFound = this.state.recipes.filter((item) => recipe.id === item.id);
			this.setState({currentRecipe: recipeFound[0]});
		} else {
			this.setState({currentRecipe: {
				name: '',
				ingredients: [],
				image: '',
        directions: ''
			}});
		}
		this.setState({
      //Switch between closed and opened state of the modal and add/close button
			modalParentClass: this.state.modalParentClass === 'modal-container' ? 'modal-container modal-container-visible modal-add-container' : 'modal-container',
			iconClass: this.state.iconClass === 'add-icon' ? 'cancel-icon' : 'add-icon'
		});
    //Scroll to the top of the modal once the user closes the modal
    this.refs.modalView.scrollTop = 0;
	},
  openRecipe: function(recipe) {
    //This function is passed the recipe that's being viewed as a parameter, and changes the openedRecipe state object accordingly, which is displayed in the recipe view modal
    this.setState({
      openedRecipe: {
        id: recipe.id,
        name: recipe.name,
        ingredients: recipe.ingredients,
        image: recipe.image,
        directions: recipe.directions
      },
      //Switch between closed and opened state of the modal and add/close button
			modalParentClass: this.state.modalParentClass === 'modal-container' ? 'modal-container modal-container-visible modal-view-container' : 'modal-container',
			iconClass: this.state.iconClass === 'add-icon' ? 'cancel-icon' : 'add-icon'
    });
  },
	saveRecipe: function(e) {
    //Prevent the form from being submitted and refreshing the page
		e.preventDefault();
		let recipesUpdated;
    //Check if the recipe exists in the recipes array
		let recipeExists = this.state.recipes.filter((recipe) => recipe.id === this.state.currentRecipe.id);
		if (recipeExists.length < 1) {
      //If it does not, the recipe is added to the recipesUpdated array which will later replace the state recipe array -- adds a new recipe to the page
			recipesUpdated = this.state.recipes.concat({
				id: Math.floor(Math.random() * 9999999),
				name: this.state.currentRecipe.name,
				ingredients: this.state.currentRecipe.ingredients,
				image: this.state.currentRecipe.image,
        directions: this.state.currentRecipe.directions
			});
		} else {
      //If the recipe is already in the state recipe array, loop through the array, and only modify the recipe that's being edited
			recipesUpdated = [];
      //A basic for loop is used in order to prevent this from binding to a method like map or forEach
			for (var i = 0; i < this.state.recipes.length; i++)  {
				if (this.state.recipes[i].id === recipeExists[0].id) {
					recipesUpdated.push({
						id: this.state.recipes[i].id,
						name: this.state.currentRecipe.name,
						ingredients: this.state.currentRecipe.ingredients,
						image: this.state.currentRecipe.image,
            directions: this.state.currentRecipe.directions
					});
				} else recipesUpdated.push(this.state.recipes[i]);
			}
		}
    //The recipesUpdated array is saved to the local storage for further website visits, and also set as the value of the state recipes array
		this.saveToLocalStorage(recipesUpdated);
		this.setState({
			recipes: recipesUpdated,
			modalParentClass: 'modal-container',
			iconClass: 'add-icon',
			currentRecipe: {
				name: '',
				ingredients: [],
				image: '',
        directions: ''
			}
		});
	},
	saveToLocalStorage: function(recipes) {
		localStorage.setItem('_abdulahhamzic_recipes', JSON.stringify(recipes));
	},
  //The following functions are used for two-way data-binding in the modal form
	updateName: function (e) {
		let {name, ...recipeUpdated} = this.state.currentRecipe;
    recipeUpdated.name = e.target.value;
    this.setState({
      currentRecipe: recipeUpdated
		});
	},
	updateIngredients: function (e) {
		let {ingredients, ...recipeUpdated} = this.state.currentRecipe;
    recipeUpdated.ingredients = e.target.value.split(',');
    this.setState({
      currentRecipe: recipeUpdated
		});
	},
	updateImage: function (e) {
		let {image, ...recipeUpdated} = this.state.currentRecipe;
    recipeUpdated.image = e.target.value;
    this.setState({
      currentRecipe: recipeUpdated
		});
	},
  updateDirections: function(e) {
    let {directions, ...recipeUpdated} = this.state.currentRecipe;
    recipeUpdated.directions = e.target.value;
    this.setState({
      currentRecipe: recipeUpdated
		});
  }
});

ReactDOM.render(<RecipeBox />, document.getElementById('app'));
