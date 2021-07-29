import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Input from '@material-ui/core/Input';

const Signup = () => {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  useEffect(()=>{
    console.log('---',name);
    console.log('---',email);
    console.log('---',password);
  },[name, email, password])

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestBody = {
      query: `
          mutation {
            createUser(userInput: {name: "${name}", email: "${email}", password: "${password}" }) {
              _id
              name
              email
            }
          }
        `
    };
    
    console.log(name, email, password);
    // if(name && email && password)
    fetch("http://localhost:4616/graphql", 
      { 
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(res => res.json())
    .then(resp=>{ console.log('immmmm cinayyy',resp) })
    .catch(err => { console.log('vinay err::',err) });
    console.log(name, email, password);
  };

    return (
        <div className='bg-warning heightFull'>
            <div className='container'>
                <div className='row pt-5'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4 mt-5'>
                        <Card className='shadow-lg p-3 mb-5 bg-body rounded'>
                            <CardHeader title="Sign To The Portal" />
                            <CardContent>

                                <form class="row g-3" onSubmit={handleSubmit}>
                                    <div class="col-md-12">
                                        <Input value={name} onChange={(e)=>setName(e.target.value)}  type="name" className='w-100' id="standard-basic" placeholder="Name" />
                                    </div>
                                    <div class="col-md-12">
                                        <Input value={email} onChange={(e)=>setEmail(e.target.value)} className='w-100' type="email" id="standard-basic" placeholder="Email" />
                                    </div>
                                    <div class="col-md-12">
                                        <Input value={password} onChange={(e)=>setPassword(e.target.value)} className='w-100' type="password" id="standard-password-input" placeholder="Password"  />
                                    </div>
                                    <div class="col-12">
                                        <Button variant="contained" type="submit">SignUp</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='col-md-4'></div>
                </div>
            </div>
        </div>
    )
}

export default Signup
