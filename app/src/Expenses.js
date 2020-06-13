import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

//import css file for react-datepicker
import 'react-datepicker/dist/react-datepicker.css';

//import Containers for FormGroup and Button
import { Table,Container,Input,Button,Label, FormGroup, Form} from 'reactstrap';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

class Expenses extends Component {

    // {
    //   "id": 100,
    //   "expensedate": "2019-06-16T17:00:00Z",
    //   "description": "New York Business Trip",
    //   "location": "New York",
    //   "category": {
    //   "id": 1,
    //   "name": "Travel"
    //   }
    // },

    emptyExpense = {
        id: 104,
        expensedate: new Date(),
        description: '',
        location: '',
        category: {
            id: 1, 
            name:'Travel'
        }
    }


    constructor(props){
        super(props)

        this.state = { 
            date: new Date(),
            isLoading : true,
            expenses : [],
            categories : [] ,
            expenseItem : this.emptyExpense
        }

        //Bind handSubmit with this constructor state for onSubmit in form group
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

    }

    //handlesSubmit post method call to api
    async handleSubmit(event){
        
        let expenseItem = this.state.expenseItem;

        await fetch(`/api/expenses`, {
            method: 'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }, 
            body : JSON.stringify(expenseItem),
        });

        //stop from resetting the submission
        //event.preventDefault(); 
        //push propeties history of the expense component route
        this.props.history.push('/expenses');

    }

    //handlesChanage to form
    handleChange(event){
        const target = event.target; //target of input value and name
        const value = target.value;
        const name = target.name;
        let item = {...this.state.expenseItem}; //var item is array of expensesItem
        item[name] = value;
        this.setState({item});
        console.log(item);
     };
  
     //handlesChanage to date
     handleDateChange(date){
         let item = {...this.state.expenseItem};
         item.expensedate = date;
         this.setState({item});
         console.log(item);
     };

     //defined remove function for DELETE API call
    async remove(id){
        //TODO: Sever Error 500 fix
        await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        }).then(()=> {
            //update every array of expenses with lambda filter expression
            let updatedExpenses = [...this.state.expenses].filter(i=>i.id !== id);
            this.setState({expenses : updatedExpenses});
        });
    } 

    // async call for component mounted. Loads API json call to expense array
    async componentDidMount(){
        const response = await fetch(`/api/categories`);
        const body = await response.json();
        this.setState({categories : body, isLoading : false});

        const responseEXP = await fetch(`/api/expenses`);
        const bodyEXP = await responseEXP.json();
        this.setState({expenses : bodyEXP, isLoading : false});
        console.log(bodyEXP);
    }     

    render() { 
        const title = <h3>Add Expense</h3> //defeine title property
        const{categories} = this.state;
        const{expenses,isLoading} = this.state;

        //optionList variable iterates through options from map for select tag add key tag for unique
        let optionList = 
                categories.map( category => 
                    <option value={category.id} key={category.id}> 
                        {category.name}
                    </option>
                )

        //dynamicall dislplay row of expenses
        let rows = expenses.map(expense => 
                    <tr key={expense.id}>
                        <td>{expense.description}</td>
                        <td>{expense.location}</td>
                        <td><Moment date={expense.expensedate} format= "YYYY/MM/DD"/></td>
                        <td>{expense.category.name}</td>
                        <td><Button size='sm' color='danger' onClick={()=>this.remove(expense.id)}>Delete</Button></td>
                    </tr>
                    )

        //isLoading boolean loads when its false
        if(isLoading)
            return(<div>Loading...</div>);
        
        return ( 

            <div> 
                <Container >
                    {title} {/*refers to title propety*/}

                    <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for ='description'>Title</Label>
                        <Input type ='description' name='description' id='description' 
                        onChange={this.handleChange} autoComplete='name'/>
                    </FormGroup>

                    <FormGroup>
                        <Label for ='category'>Category</Label>{' '}
                        <select onChange={this.handleChange}>
                            {optionList}
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <Label for ='expenseDate'>Date</Label>{' '}
                        {/* TODO update date in Datepicker */}
                        <DatePicker selected={this.state.expenseItem.expensedate} onChange={this.handleDateChange}/> 
                    </FormGroup>

                    <div  className='row'>
                        <FormGroup className='col-md-4 mb-3'>
                        <Label for ='location'>Location</Label>
                        <Input type ='text' name='location' id='location' onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <FormGroup>
                    <Button color='primary' type='submit'>Save</Button>{' '}
                    <Button color='secondary' tag={Link} to='/'>Cancel</Button>
                    </FormGroup>
                    </Form>

                </Container>
                {' '}
                <Container>
                    <h3>Expense List</h3>
                    <Table className='mt-4'>
                        <thead>
                        <tr>
                            <th width='30%'>Description</th>
                            <th width='10%'>Location</th>
                            <th>Date</th>
                            <th width='20%'>Category</th>
                            <th width='10%'>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                        
                    </Table>

                </Container>

            </div>
        );
    }
}
 
export default Expenses;