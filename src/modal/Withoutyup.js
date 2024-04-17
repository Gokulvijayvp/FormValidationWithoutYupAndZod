import React, { useState } from 'react'

const Withoutyup = () => {
    const[formData, setFormData] = useState({
        firstname :"",
        secondname:"",
        email :"",
        phone:"",
        password :"",
        repassword :"",
        age:"",
        gender:"",
        degree :[],
        birthdate :"",
        meterial :[],
    })

    const[errors,setErrors] = useState({})
    
    const isValidEmail =(email)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const isValidPhone =(phoneNumber) =>{
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }

    const isValidPassword = (password) =>{
        // const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/
        // const numberRegex = /[0-9]/
        // const upperCaseRegex = /[A-Z]/
        // const lowerCaseRegex = /[a-z]/
         
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return( 
            passwordRegex.test(password)

            // password.length >= 8 && 
            // symbolRegex.test(password) &&
            // numberRegex.test(password) &&
            // upperCaseRegex.test(password) &&
            // lowerCaseRegex.test(password)
        );
    }

    const isValidAge = (age) =>{
        return parseInt(age) >= 18 && parseInt(age) <= 100
    }
    

    const validationForm = () =>{
        let newErrors ={}

        if(!formData.firstname){
            newErrors.firstname = "First name is required"
        }

        if(!formData.secondname){
            newErrors.secondname = "Second name is required"
        }

        if(!formData.email){
            newErrors.email = "Email is required"
        }else if(!isValidEmail(formData.email)){
            newErrors.email = "invalid email format"
        }

        if(!formData.phone){
            newErrors.phone = "Phone Number is required"
        }else if(!isValidPhone(formData.phone)){
            newErrors.phone = "Phone Number must match"
        }

        if(!formData.password){
            newErrors.password = "Password is required"
        }else if(!isValidPassword(formData.password)){
            newErrors.password = 
            "You must be at least 8 characters long and contain at last on symbol, one number, one Uppercase, one Lowercase,"
        }

        if(!formData.repassword){
            newErrors.repassword = "Re password is required"
        }else if(formData.repassword  !== formData.password){
            newErrors.repassword ="Passwords must match"
        }

      
        if (!formData.age) {
            newErrors.age = "Age is required";
        } else if (!isValidAge(formData.age)) {
            newErrors.age = "You must be at least 19 years old and not older than 100 years";
        }

        if(!formData.gender){
            newErrors.gender ="Gender is required"
        }

        if(formData.degree.length === 0){
            newErrors.degree = "Select at one Degree"
        }

        if(formData.meterial.length === 0){
            newErrors.meterial = "Select at least one Meterial"
        }

        if(!formData.birthdate){
            newErrors.birthdate = "Date of birth is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    console.log(errors)

    const handleFormValidation = (event) =>{
        event.preventDefault()
        const isValid = validationForm()
        
        if(isValid){
            console.log('form submitted', formData)
        }else{
            console.log("form validation faild")
        }
    }

    const handleChange =(e) =>{
        const{name,value} = e.target;
        setFormData({...formData,
            [name] : value,
        })
    }

    const handleCheckBoxChange =(e)=>{
        const {name, checked} = e.target
        let updateMerial = [...formData.meterial]
        if(checked){
            updateMerial.push(name)
        }else{
            updateMerial = updateMerial.filter((meterial) => meterial !== name)
        }

        setFormData({
            ...formData,
            meterial : updateMerial,
        })
    }

    const handleRadioChange = (e) => {
        const { name, checked } = e.target;
        let updatedDegree = [...formData.degree];

        if (checked) {
            updatedDegree.push(name);
        } else {
            updatedDegree = updatedDegree.filter(degree => degree !== name);
        }

        setFormData({
            ...formData,
            degree: updatedDegree, 
        });
    };


  return (
    <div className='p-3'>
        <form onSubmit={handleFormValidation}>
            <div className="mb-3">
                <label htmlFor="firstname" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstname" name='firstname' value={formData.firstname} onChange={handleChange} />
                
                {errors.firstname && <div className="form-text error">{errors.firstname}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="secondname" className="form-label">Second Name</label>
                <input type="text" className="form-control" id="secondname" name='secondname' value={formData.secondname} onChange={handleChange}/>
                {errors.secondname && <div className="form-text error">{errors.secondname}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' value={formData.email} onChange={handleChange}/>
                {errors.email && <div className="form-text error">{errors.email}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="number" className="form-control" id="phone" name='phone' value={formData.phone} onChange={handleChange}/>
                {errors.phone && <div className="form-text error">{errors.phone}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={formData.password} onChange={handleChange}/>
                {errors.password && <div className="form-text error">{errors.password}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="repassword" className="form-label">Re-Password</label>
                <input type="password" className="form-control" id="repassword" name='repassword' value={formData.repassword} onChange={handleChange}/>
                {errors.repassword && <div className="form-text error">{errors.repassword}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input type="number" className="form-control" id="age" name='age' value={formData.age} onChange={handleChange}/>
                {errors.age && <div className="form-text error">{errors.age}</div>}
            </div>
            <div className='d-flex gap-3 mb-3'>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="bachelor"
                        id="flexRadioDefault1"
                        checked={formData.degree.includes('bachelor')}
                        onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Bachelor's
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="master"
                        id="flexRadioDefault2"
                        checked={formData.degree.includes('master')}
                        onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Master's
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="engineering"
                        id="flexRadioDefault3"
                        checked={formData.degree.includes('engineering')}
                        onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                        Engineering
                    </label>
                </div>
                {errors.degree && <div className="form-text error">{errors.degree}</div>}
            </div>
            <div className='mb-3'>
                <select
                    className="form-select"
                    name='gender'
                    value={formData.gender}
                    onChange={handleChange}
                    aria-label="Default select example"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && <div className="form-text error">{errors.gender}</div>}
            </div>
            <div className='mb-3'>
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <input className='form-control' type="date" name="birthdate" id="dob"  value={formData.birthdate} onChange={handleChange}/>
                {errors.birthdate && <div className="form-text error">{errors.birthdate}</div>}
            </div>
            <div className="mb-3 form-check d-flex gap-3">
                <div className='ms-3'>
                    <input type="checkbox" 
                        className="form-check-input" 
                        id="exampleCheck1" name='single' checked={formData.meterial.includes('single')} onChange={handleCheckBoxChange}/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Single</label>
                </div>
                <div className='ms-3'>
                    <input type="checkbox" className="form-check-input" name='married' id="exampleCheck2" checked={formData.meterial.includes('married')}
                    onChange={handleCheckBoxChange}/>
                    <label className="form-check-label" htmlFor="exampleCheck2">Married</label>
                </div>
                <div className='ms-3'>
                    <input type="checkbox" className="form-check-input" name='unmarried' id="exampleCheck3" checked={formData.meterial.includes('unmarried')}
                    onChange={handleCheckBoxChange}/>
                    <label className="form-check-label" htmlFor="exampleCheck3">Unmarried</label>
                </div>
                {errors.meterial && <div className="form-text error">{errors.meterial}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Withoutyup