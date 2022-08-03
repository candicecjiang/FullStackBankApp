function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const ctx = React.useContext(UserContext);  
  const [isLoggedin, setIsLoggedin] = React.useState(ctx.users[0].isLoggedin);  

  function CreateForm(props){
    const [name, setName]         = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');

    // Validating inputs
    function validate(field, label){
      if (!field) {
        setStatus('Please fill in ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if ((label == 'password') && (password.length < 6)) {
        setStatus('Password needs to be at least 6 characters long.')
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      else if (!(/\S+@\S+\.\S+/.test(email))) {
        setStatus('Please enter a valid email.');
        return false;
      }
      return true;
    }

    function handleCreate(){
      console.log(name,email,password);
      if (!validate(name,     'name'))     return;
      if (!validate(email,    'email'))    return;
      if (!validate(password, 'password')) return;
      const url = `/account/create/${name}/${email}/${password}`;
      (async () => {
          var res  = await fetch(url);
          var data = await res.json();    
          console.log(data);        
      })();
      ctx.users[0]={name, email, password, balance: 0, isLoggedin: true};
      console.log(ctx.users);
      props.setShow(false);
    }    

    return (<>
      Name<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter name" 
        value={name} 
        onChange={e => setName(e.currentTarget.value)} /><br/>

      Email address<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>

      Password<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>

      <button type="submit" 
        className="btn btn-light" 
        onClick={handleCreate}>Create Account</button>

    </>);
  }
  
  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        isLoggedin ?
          (<>
            <h5>Hello {ctx.users[0].name}</h5>
            Want to create another account?<br/>
            Please log out first.<br/>
            <button type="submit"
              className="btn btn-light"
              onClick={
                () => { 
                setIsLoggedin(false);
                ctx.users[0]={name:'test',email:'test@mit.edu',password:'secret',balance:100, isLoggedin: false};}
              }>
              Logout
            </button></>
          ) :
          (<>
            {show ? 
            <CreateForm setShow={setShow}/> : 
            <CreateMsg setShow={setShow}/>}
          </>)
        }
    />
  )

  function CreateMsg(props){
    const name= ctx.users[0].name;
    return(<>
      <h5>Success</h5>
      <h5>You are now logged in as {name}</h5>
    </>);
  }
}
