function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const ctx = React.useContext(UserContext);
  const isLoggedin = ctx.users[0].isLoggedin;

  function validate(field){
    if (field <= 0) {
      setStatus('Amount needs to be positive.')
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
  }

  function DepositForm(props){
    const [email, setEmail]   = React.useState(ctx.users[0].email);
    const [amount, setAmount] = React.useState('');
  
    function handleDeposit(){
      console.log(Number(amount), amount);
      if (!validate(Number(amount))) return;

      fetch(`/account/update/${email}/${amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              // props.setStatus(JSON.stringify(data.value));
              props.setShow(false);
              ctx.users[0].balance += Number(amount);
              console.log('JSON:', data);
          } catch(err) {
              props.setStatus('Deposit failed')
              console.log('err:', text);
          }
      });
    }
  
    return(<>
      <h5>Hello {ctx.users[0].name}</h5>
      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handleDeposit}>Deposit</button>
  
    </>);
  }

  function DepositMsg(props){
    return (<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {
            props.setShow(true);
            props.setStatus('');
        }}>
          Deposit again
      </button>
    </>);
  } 

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        isLoggedin ? 
          <>{show ? 
            <DepositForm setShow={setShow} setStatus={setStatus}/> :
            <DepositMsg setShow={setShow} setStatus={setStatus}/>}
          </> : 
          (<>
            <h5>Please log in first.</h5>
            <Link 
              className="btn btn-light"
              to="../login">
              Go to log in Page
            </Link>
          </>)
      }
    />
  )
}



