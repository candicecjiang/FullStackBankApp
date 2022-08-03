function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(''); 
  const ctx = React.useContext(UserContext);
  // const [name, setName]       = React.useState('');
  const [isLoggedin, setIsLoggedin] = React.useState(ctx.users[0].isLoggedin);  
  // console.log(name, isLoggedin);

  function LoginMsg(props){
    return (<>
      <h5>Hello {ctx.users[0].name}</h5>
      <button type="submit"
        className="btn btn-light"
        onClick={
          () => {props.setShow(true); 
          setIsLoggedin(false);
          ctx.users[0]={name:'test',email:'test@mit.edu',password:'secret',balance:100, isLoggedin: false};
        }}>
        Logout
      </button></>
    ) 
  }

  function LoginForm(props){
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleLogin(){
      fetch(`/account/login/${email}/${password}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setStatus('');
              props.setShow(false);
              
              ctx.users[0]={name: data.name, email: data.email, password: data.password, balance: data.balance, isLoggedin: true};
              setIsLoggedin(ctx.users[0].isLoggedin);
              // setName(ctx.users[0].name);
              console.log('JSON:', data);
              console.log(ctx.users);
          } catch(err) {
              // props.setStatus(text)
              console.log('err:', text);
          }
      });
    }
    
    function LoginWGoogle(){      
      // Firebase configuration
      var firebaseConfig = {
        apiKey: "AIzaSyDi7Juskx_jfP6Jq1A3lUdjhBA4f0Seluc",
        authDomain: "full-stack-bank.firebaseapp.com",
        projectId: "full-stack-bank",
        storageBucket: "full-stack-bank.appspot.com",
        messagingSenderId: "513964242248",
        appId: "1:513964242248:web:929c7f8ce093bef7bc2f7d"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      console.log("google clicked");
      const provider = new firebase.auth.GoogleAuthProvider();

      fetch(`/account/findOne/${email}`)
      .then(response => response.text())
      .then(text => {
        try {
            const data = JSON.parse(text);
            ctx.users[0]={name: data.name, email: data.email, password: data.password, balance: data.balance, isLoggedin: true};
            setIsLoggedin(ctx.users[0].isLoggedin);
            // setName(ctx.users[0].name);
            console.log('JSON:', data);
            console.log(ctx.users);
        } finally {
            // props.setStatus(text)
            firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
              ctx.users[0]={name: result.user.email, email: result.user.email, password: result.user.password, balance: 0, isLoggedin: true};
              // setName(result.user.name);
              setIsLoggedin(true);
              const url = `/account/create/${result.user.email}/${result.user.email}/${result.user.password}`;
              (async () => {
                  var res  = await fetch(url);
                  var data = await res.json();    
                  console.log(data);        
              })();
              // setStatus(`You are logged in using the following email: ${result.user.email}`);
            })
            .catch((error) => {
              console.log(error.code);
              console.log(error.message);
            });
        }
      });
    }

    return (<>

      Email<br/>
      <input type="input" 
        id="email"
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>

      Password<br/>
      <input type="password" 
        input id="password"
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>

      <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button><br/>
      <>Or</><br/>
      <button className="btn btn-light" onClick={LoginWGoogle}>Login with Google</button>
    
    </>);
  }

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={isLoggedin ? 
        <LoginMsg setShow={setShow} setStatus={setStatus}/>:
        <LoginForm setShow={setShow} setStatus={setStatus}/>
        }
    />
  ) 
}


