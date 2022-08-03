function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const ctx = React.useContext(UserContext);
  const isLoggedin = ctx.users[0].isLoggedin;
  const userBalance = ctx.users[0].balance;

  function WithdrawForm(props){
    const [email, setEmail]   = React.useState(ctx.users[0].email);
    const [amount, setAmount] = React.useState('');
    function validate(field){
      
      if (field <= 0) {
        setStatus('Can only withdraw a positive amount.')
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      else if (userBalance - Number(amount) < 0) {
        setStatus("Can't withdraw more than current balance.")
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
    }
    function handleWithdraw(){
      if (!validate(amount, 'amount'))  return;
      fetch(`/account/update/${email}/-${amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              // props.setStatus(JSON.stringify(data.value));
              props.setShow(false);
              ctx.users[0].balance -= Number(amount);
              console.log('JSON:', data);
          } catch(err) {
              props.setStatus('Deposit failed')
              console.log('err:', text);
          }
      });
    }
  
    return(
      <>
        <h5>Hello {ctx.users[0].name}</h5>
        Amount<br/>
        <input type="number" 
          className="form-control" 
          placeholder="Enter amount" 
          value={amount} 
          onChange={e => setAmount(e.currentTarget.value)}/><br/>
    
        <button type="submit" 
          className="btn btn-light" 
          onClick={handleWithdraw}>
            Withdraw
        </button>
      </>
    );
  }

  function WithdrawMsg(props){
    return(<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}>
          Withdraw again
      </button>
    </>);
  }

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        isLoggedin ? 
          <>{show ? 
            <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
            <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
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



