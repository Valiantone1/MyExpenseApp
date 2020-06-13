import React, { Component } from 'react';

class Category extends Component {
    //Internal storage of any component don't directly access it
    state = { 
        isLoading : true,
        Categories : []
     }

     //sync send request then you wait for response
     //async better user experience send a request and don't wait
     async componentDidMount(){
         const response = await fetch('/api/categories') 
         const body = await response.json()
         this.setState({Categories: body, isLoading: false})
     }

    render() { 
        const {Categories, isLoading} = this.state;
        if(isLoading)
            return(<div>Loading...</div>);

        return ( 
                <div>
                    <h2>Categories</h2>
                    {
                    
                        Categories.map(category => 
                            <div id = {category.id}>
                                {category.name}                        
                            </div>
                        )
                    }

                </div> 
        );
    }
}
 
export default Category;