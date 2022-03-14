import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
// note: using a CircularProgress here causes all the page contents to "jump". that is usually considered poor UI/UX
import CircularProgress from '@mui/material/CircularProgress';

/*
   task: click counter. when button is clicked, a number increases on the screen

   definitions:
   asynchronous call - when actions you want to take can require an undetermined amount of time.
   promises - allow you to follow up on asynchronous calls when they are finished / or throw an error
*/

function App() {
    const [counter, set_counter] = useState(0);
    const [loading, set_loading] = useState(false);
    
    const mock_api_call = () => {
	return new Promise(
	    (resolve, reject) => {
		setTimeout(() => {
		    if(Math.random() < .3){
			// about 1/3 of the time, throw an error
			reject();
		    }else{
			set_counter(counter + 1);
			resolve();
		    }
		}, 3000 + 3000 * Math.random());
	    }
	)
    };
    
    return (
	<div className="App">
	    <header className="App-header">
		clicked {counter} times
		<button disabled={loading} onClick={() => {
		    set_loading(true);
		    const counter_promise = mock_api_call();
		    counter_promise
			.then(() => {
			    set_loading(false);
			    // this code executes when the promise resolves
			}).catch((error) => {
			    set_loading(false);
			    alert('some error has happened!');
			    // this code executes when the promise is rejected
			}).finally(() => {
			    // this code executes after .then() and .catch()
			});
		}}>
		    {loading && <span>please wait</span>}
		    {!loading && <span>click me</span>}
		</button>
		{loading && <CircularProgress />}
	    </header>
	</div>
    );
}

export default App;
