
<div className="container">
    <div className="center">
        <h1>Register</h1>
        <form method="POST" action="">
            <div className="txt_field">
                <input type={text} name="name" required />
                <span></span> 
                <label>Name</label>
            </div>
            <div className="txt_field">
                <input type={"email"} name="email" required /> 
                <span></span> 
                <label>Email</label> 
            </div>
            <div className="txt_field">
                <input type={"password"} name="password" required /> 
                <span></span> 
                <label>Password</label> 
            </div> 
            <div className="txt_field">
                <input type={"password"} name="cpassword" required /> 
                <span></span> 
                <label>Confirm Password</label> 
            </div> 
            <input name="submit" type={submit} value="Sign Up"/>
            <div className="signup_link">
                Have an Account ? <a href="../login">Login</a>
            </div>
        </form>
    </div>
</div>