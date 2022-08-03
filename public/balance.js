function Balance(){
  const [status, setStatus] = React.useState('true');

  const ctx = React.useContext(UserContext); 
  console.log(ctx.users[0].balance, typeof(ctx.users[0].balance)); 
  const userBalance = ctx.users[0].balance;
  const isLoggedin = ctx.users[0].isLoggedin;

  return (
    <Card
      bgcolor="info"
      header="Balance"
      // status={status}
      body={isLoggedin ? (
        <>
          <h5>Hello {ctx.users[0].name}<br/></h5>
          Your current balance is ${userBalance}.
        </>
        ):
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