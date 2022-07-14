import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import firebaseApp from '../firebaseConfig';
import { collection, ref, push, addDoc, setDoc, doc, docs, getDocs, deleteDoc, arrayUnion, getDoc, updateDoc, query, Timestamp } from "firebase/firestore";
import { getFirestore, onSnapshot } from "firebase/firestore";
import Router from 'next/router';
import Link from 'next/link'
import Header from "../component/module/Header"

const db = getFirestore();

//Image import
import topbannerimg from '../public/images/topbanner.png';
import walogo from '../public/images/whatsapp.png'

const sevencheckdata = [
    { name: "Easy to earn" },
    { name: "Difficult to earn" },
    { name: "To be used for self and family" },
    { name: "To be used for self, family and society" },
    
];


const RegistrationForm = ()=> {
    const [phoneNum, setphoneNum] = useState('')
    const [username, setusername] = useState('')
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [singleUsers, setsingleUsers] = useState('');
    const [singleAdminUsers, setsingleAdminUsers] = useState('');

    // questions state

    const [onecheck, setoneCheck] = useState('');
    const [twocheck, setTwoCheck] = useState('');
    const [threecheck, setThreeCheck] = useState('');
    const [fourcheck, setFourCheck] = useState('');
    const [fivecheck, setFivecheck] = useState('');
    const [sixcheck, setSixCheck] = useState('');
    const [sevencheck, setSevenCheck] = useState(sevencheckdata);
    const [eightcheck, setEightCheck] = useState('');

    const [oneQuestionInput, setOneQuestionInput] = useState("");
    const [twoQuestionInput, setTwoQuestionInput] = useState("");
    const [threeQuestionInput, setThreeQuestionInput] = useState("");
    const [fiveQuestionInput, setFiveQuestionInput] = useState("");
    const [eightQuestionInput, setEightQuestionInput] = useState("");


    const [UserData, setUserData] = useState([]);
    const [userId, setuserId] = useState('');
    const [error, seterror] = useState(false);
    const [formsubmit, setformsubmit] = useState(false);
    const [formbgImage, setformbgImage] = useState('');
    const [mobileFormbg, setmobileFormbg] = useState('')
    const [eventName, seteventName] = useState('');

    // condition for input
 
 
    const [whatsappgroup, setwhatsappgroup] = useState("");


  //function for add data in firebase
  const HandleSubmitForm = async (event) => {
    event.preventDefault();

    const isLogin = localStorage.getItem("ucore");
    const usersDetails = JSON.parse(isLogin);
    console.log(usersDetails);

    const data = {
        username: username,
        phoneNum: phoneNum,
        PreOneAns: onecheck,
        preOneInput:oneQuestionInput,
        PreTwoAns: twocheck,
        preTwoInput:twoQuestionInput,
        PreThreeAns: threecheck,
        preThreeInput:threeQuestionInput,
        PreFourAns: fourcheck,
        PreFiveAns: fivecheck, 
        preFiveInput:fiveQuestionInput,  
        PreSixAns:sixcheck,
        PreSevenAns:sevencheck,   
        PreEightAns:eightcheck, 
        preEightInput:eightQuestionInput,  
        preFormSubmit: true,
        createdBy:Timestamp.now(),

    };

    //if user empty throw error else merge the form data in firebase
    if (onecheck==="" || twocheck==="" || threecheck==="" || fourcheck==="" || fivecheck==="" || sixcheck==="" ||sevencheck==="" || eightcheck==="" )
    {
        seterror(true);
        setSevenCheck(sevencheckdata);
    }
    else {

        const isLogin = localStorage.getItem("ucore");
        const usersDetails = JSON.parse(isLogin);
        setformbgImage();
        const docRef = doc(db, usersDetails.eventName, phoneNum);
        await setDoc(docRef, data, { merge: true });

        // const docSnap = await getDoc(docRef);
        console.log("Form data", data);
        setformsubmit(true);

    };

    // clear all field after submit the data
    setoneCheck("");
    setOneQuestionInput("");
    setTwoCheck("");
    setTwoQuestionInput("");
    setThreeCheck("");
    setThreeQuestionInput("");
    setFourCheck("");
    setFivecheck("");
    setFiveQuestionInput("");
    setSixCheck("");
    setSevenCheck(sevencheck);
    setEightCheck("")
    setEightQuestionInput("");
   

    // setformbgImage("");


}

    //target checked data for store in firestore
    const questionOne = (event) => {
        const target = event.target;
        if (target.checked) {
            setoneCheck(target.value);
            console.log(event.target.value);
        }

    };

    const questionTwo = (event) => {
        const target = event.target;
        if (target.checked) {
            setTwoCheck(target.value);
            console.log(event.target.value);
        }

    };
    const questionThree = (event) => {
        const target = event.target;
        if (target.checked) {
            setThreeCheck(target.value);
           
            console.log(event.target.value);
        }

    };
    const questionFour = (event) => {
        const target = event.target;
        if (target.checked) {
            setFourCheck(target.value);
            
            console.log(event.target.value);
        }

    };
    const questionFive = (event) => {
        const target = event.target;
        if (target.checked) {
            setFivecheck(target.value);
      
            console.log(event.target.value);
        }

    };
    const questionSix = (event) => {
        const target = event.target;
        if (target.checked) {
            setSixCheck(target.value);
            console.log(event.target.value);
        }

    };
    const questionSeven = (e) => {
        const {name,checked}= e.target;
    //     if(name === "AllSelect"){
    //       let tempSevenData=sevencheck.map((sevendetails)=>{
    //             return {...sevendetails, isChecked:checked}  });
    //         setSevenCheck(tempSevenData);

    //     }
    //    else{
        let tempSevenData=sevencheck.map((sevendetails)=>
        sevendetails.name === name ? { ...sevendetails, isChecked:checked } : sevendetails);
        setSevenCheck(tempSevenData)

        console.log("seventquestion",sevencheck);
    //    }
       
        // const target = event.target;
        // if (target.checked) {
        //     setSevenCheck(target.value);
        //     console.log(event.target.value);
        // }

    };

    const questionEight = (event) => {
        const target = event.target;
        if (target.checked) {
            setEightCheck(target.value);
            console.log(event.target.value);
        }

    };

    useEffect(() =>{
        setSevenCheck(sevencheckdata);

    },[])
    
   

useEffect(() => {
    const isLogin = localStorage.getItem("ucore");
    const usersDetails = JSON.parse(isLogin);
    console.log(usersDetails);


    console.log(usersDetails.username);
    console.log(usersDetails.phoneNum);
    setusername(usersDetails.username);
    setphoneNum(usersDetails.phoneNum);
    seteventName(usersDetails.eventName);

    const eventName = usersDetails.eventName;

    console.log(eventName);


    setLoading(true);

    // if(preFormSubmit){

    // Router.push("/dashboard");

    // }else{

    // }

    const getsingleDoc = async () => {

        const isLogin = localStorage.getItem("ucore");
        const usersDetails = JSON.parse(isLogin);
        console.log(usersDetails);
        const FormEventName = usersDetails.eventName;
        const FormPhoneNumber = usersDetails.phoneNum;


        const docRef = doc(db, FormEventName, FormPhoneNumber);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());

        if (docSnap.exists()) {
            setsingleUsers(docSnap.data());
            console.log(singleUsers);
            console.log("Document data:", docSnap.data());
            const prefillformsubmit = docSnap.data().preFormSubmit;
            if (prefillformsubmit) {

                Router.push("/dashboard");
            } else {

                // alert("kindly fill the form");
            }


        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }

    const getSingleAdminDoc = async () => {

        const isLogin = localStorage.getItem("ucore");
        const usersDetails = JSON.parse(isLogin);
        console.log(usersDetails);

        const docRef = doc(db, "AdminMonthlyMeet", eventName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setsingleAdminUsers(docSnap.data());
            console.log(singleAdminUsers);
            console.log("Admin Document data:", docSnap.data());
            //   console.log("Admin Document data:", docSnap.data().formimage);
            setformbgImage(docSnap.data().formImgUrls);
            setmobileFormbg(docSnap.data().mobileUrls);
            setwhatsappgroup(docSnap.data().whatsappLink);
            seteventName(docSnap.data().eventName);
            console.log(docSnap.data().whatsappLink);

            console.log(eventName);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }



    }
    // getContent();
    getsingleDoc();
    getSingleAdminDoc();
}, []);

  return (
    <>

         <Header/>

        <section className="c-containerForm">

    <div className='topbanner'>
        <img className='desktopFormbg' src={formbgImage} />
        <img className='mobileFormbg' src={mobileFormbg} />

      
        {/* <Image src={topbannerimg} placeholder="blur" alt='logo' /> */}
        <div className="bannertext">
            <h1>{eventName}</h1>
        </div>
    </div>



    {/* form start  */}

    {
        formsubmit ?
            <div className="sucess">
                <h2> Thank you for sharing your responses.</h2>
                <h4> Kindly join the WhatsApp Group </h4>
                <div className='whatsappLink'>
                    <div className='walogo'>
                        <Image src={walogo} layout='responsive' />
                    </div>
                    <Link href={whatsappgroup} ><a className="whatsappbtn">Join WhatsApp Group</a></Link>
                </div>
                <Link href="/dashboard" ><a className="homelink">Go back to home to get zoom meeting link</a></Link>
            </div> : <div>
                <form onSubmit={HandleSubmitForm}>

                    <h2 className='h2'>
                        Fill this form to get introduce yourself to your own Responsibility
                    </h2>
                    {/* {
                error?<div className="error"><p>required</p></div>:null
                } */}
                    <div className="form-row">
                        <ul className="form-textfield">
                            <label>Name</label>
                            <li>
                                <input type="text"
                                    value={username}
                                    name="questionOne"
                                    disabled
                                    onChange={(event) => {
                                        setusername(event.target.value)
                                    }} />

                            </li>

                        </ul>
                    </div>

                    <div className="form-row">
                        <ul className="form-textfield">
                            <label>Phone Number</label>
                            <li>
                                <input type="text"
                                    value={phoneNum}
                                    name="questionOne"
                                    disabled
                                    onChange={(event) => {
                                        setphoneNum(event.target.value)
                                    }} />

                            </li>

                        </ul>
                    </div>

                    {/* 1st question */}
                        <div className="form-row radio-buttons">
                            <h2>1. What is your top priority in your day to day life?</h2>
                            <ul>

                                <li>

                                    <label htmlFor="1A">
                                        <input
                                            id="1A"
                                            value=" Peace in relationships"
                                            name="questionOne"
                                            type="radio"
                                            onChange={questionOne}
                                            checked={onecheck == ' Peace in relationships'} />
                                        <div className='custom_radio'></div>
                                        Peace in relationships </label>
                                </li>
                                <li>
                                    <label htmlFor="1B">
                                        <input
                                            id="1B"
                                            value="Stability in health"
                                            name="questionOne"
                                            type="radio"
                                            onChange={questionOne}
                                            checked={onecheck == 'Stability in health'} />
                                        <div className='custom_radio'></div>
                                        Stability in health</label>
                                </li>

                                <li>
                                    <label htmlFor="1C">
                                        <input
                                            id="1C"
                                            value="Securing enough wealth"
                                            name="questionOne"
                                            type="radio"
                                            onChange={questionOne}
                                            checked={onecheck == 'Securing enough wealth'} />
                                        <div className='custom_radio'></div>
                                        Securing enough wealth</label>
                                </li>

                                <li>
                                    <label htmlFor="1D">
                                        <input
                                            id="1D"
                                            value="Any other"
                                            name="questionOne"
                                            type="radio"
                                            onChange={questionOne}
                                            checked={onecheck == 'Any other'} />
                                        <div className='custom_radio'></div>
                                        Any other</label>
                                </li>

                                {onecheck==="Any other" && (  <li>
                                        <input type="text"
                                             id="oneInput"
                                            value={oneQuestionInput}
                                            name="questionOne"
                                            placeholder='Answer input'
                                            required
                                            onChange={(event) => {
                                                setOneQuestionInput(event.target.value)
                                            }} />
                                </li> )}

                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div>

                     {/* 2nd question */}
                        <div className="form-row radio-buttons">
                            <h2>2. In personal life, choose what you enjoy the most</h2>
                            <ul>

                                <li>

                                    <label htmlFor="2A">
                                        <input
                                            id="2A"
                                            value="Earning money"
                                            name="questionTwo"
                                            type="radio"
                                            onChange={questionTwo}
                                            checked={twocheck == 'Earning money'} />
                                        <div className='custom_radio'></div>
                                        Earning money </label>
                                </li>
                                <li>
                                    <label htmlFor="2B">
                                        <input
                                            id="2B"
                                            value="Spending time with self and family"
                                            name="questionTwo"
                                            type="radio"
                                            onChange={questionTwo}
                                            checked={twocheck == 'Spending time with self and family'} />
                                        <div className='custom_radio'></div>
                                         Spending time with self and family</label>
                                </li>
                                <li>
                                    <label htmlFor="2C">
                                        <input
                                            id="2C"
                                            value="Following routine to being healthy"
                                            name="questionTwo"
                                            type="radio"
                                            onChange={questionTwo}
                                            checked={twocheck == 'Following routine to being healthy'} />
                                        <div className='custom_radio'></div>
                                         Following routine to being healthy</label>
                                </li>
                                <li>
                                    <label htmlFor="2D">
                                        <input
                                            id="2D"
                                            value="Any other"
                                            name="questionTwo"
                                            type="radio"
                                            onChange={questionTwo}
                                            checked={twocheck == 'Any other'} />
                                        <div className='custom_radio'></div>
                                         Any other</label>
                                </li>

                                {twocheck==="Any other" && (  <li>
                                        <input type="text"
                                             id="twoInput"
                                            value={twoQuestionInput}
                                            name="questionTwo"
                                            placeholder='Answer input'
                                            required
                                            onChange={(event) => {
                                                setTwoQuestionInput(event.target.value)
                                            }} />
                                </li> )}

                              
                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div>

                        {/* 3nd question */}
                        <div className="form-row radio-buttons">
                            <h2>3. In professional life, choose what you enjoy the most</h2>
                            <ul>

                                <li>

                                    <label htmlFor="3A">
                                        <input
                                            id="3A"
                                            value="Developing professional engagements/contacts"
                                            name="questionThree"
                                            type="radio"
                                            onChange={questionThree}
                                            checked={threecheck == 'Developing professional engagements/contacts'} />
                                        <div className='custom_radio'></div>
                                        Developing professional engagements/contacts </label>
                                </li>
                                <li>
                                    <label htmlFor="3B">
                                        <input
                                            id="3B"
                                            value="Developing professional skills to enhance capability"
                                            name="questionThree"
                                            type="radio"
                                            onChange={questionThree}
                                          checked={threecheck == 'Developing professional skills to enhance capability'}
                                             />
                                        <div className='custom_radio'></div>
                                        Developing professional skills to enhance capability</label>
                                </li>


                                <li>
                                    <label htmlFor="3C">
                                        <input
                                            id="3C"
                                           
                                            value="Closing deals"
                                            name="questionThree"
                                            type="radio"
                                            onChange={questionThree}
                                           checked={threecheck == 'Closing deals'} />
                                        <div className='custom_radio'></div>
                                        Closing deals </label>
                                </li>

                                <li>
                                    <label htmlFor="3D">
                                        <input
                                            id="3D"
                                            value="Any other"
                                            name="questionThree"
                                            type="radio"
                                            onChange={questionThree}
                                           checked={threecheck == 'Any other'} />
                                        <div className='custom_radio'></div>
                                        Any other </label>
                                </li>

                                {threecheck==="Any other" && (  <li>
                                        <input type="text"
                                             id="threeInput"
                                            value={threeQuestionInput}
                                            name="questionThree"
                                            placeholder='Answer input'
                                            required
                                            onChange={(event) => {
                                                setThreeQuestionInput(event.target.value)
                                            }} />
                                </li> )}
                                
                    

                               

                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div>

                        {/* 4th question */}
                        <div className="form-row radio-buttons">
                            <h2>4. In personal life, in which area would you like to seek help or guidance?</h2>
                            <ul>

                                <li>

                                    <label htmlFor="4A">
                                        <input
                                            id="4A"
                                            value="In meeting financial commitments"
                                            name="questionFour"
                                            type="radio"
                                            onChange={questionFour}
                                            checked={fourcheck == 'In meeting financial commitments'} />
                                        <div className='custom_radio'></div>
                                        In meeting financial commitments </label>
                                </li>
                                <li>
                                    <label htmlFor="4B">
                                        <input
                                            id="4B"
                                            value="Prolonged health issues"
                                            name="questionFour"
                                            type="radio"
                                            onChange={questionFour}
                                            checked={fourcheck == 'Prolonged health issues'} />
                                        <div className='custom_radio'></div>
                                        Prolonged health issues</label>
                                </li>

                                <li>
                                    <label htmlFor="4C">
                                        <input
                                            id="4C"
                                            value="Sour or broken relationships"
                                            name="questionFour"
                                            type="radio"
                                            onChange={questionFour}

                                            checked={fourcheck == 'Sour or broken relationships'} />
                                        <div className='custom_radio'></div>
                                        Sour or broken relationships </label>
                                </li>

                                <li>
                                    <label htmlFor="4D">
                                        <input
                                            id="4D"
                                            value="All of the above"
                                            name="questionFour"
                                            type="radio"
                                            onChange={questionFour}
                                            checked={fourcheck == 'All of the above'} />
                                        <div className='custom_radio'></div>
                                        All of the above </label>
                                </li>
                             

                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div>

                         {/* 5th question */}
                         <div className="form-row radio-buttons">
                            <h2>5. In professional life, in which area would you like to seek  help or guidance?</h2>
                            <ul>

                                <li>

                                    <label htmlFor="5A">
                                        <input
                                            id="5A"
                                            value="Communication"
                                            name="questionFive"
                                            type="radio"
                                            onChange={questionFive}
                                            checked={fivecheck == 'Communication'} />
                                        <div className='custom_radio'></div>
                                        Communication </label>
                                </li>
                                <li>
                                    <label htmlFor="5B">
                                        <input
                                            id="5B"
                                            value="Sales (Closing the deals)"
                                            name="questionFive"
                                            type="radio"
                                            onChange={questionFive}
                                            checked={fivecheck == 'Sales (Closing the deals)'} />
                                        <div className='custom_radio'></div>
                                        Sales (Closing the deals)</label>
                                </li>

                                <li>
                                    <label htmlFor="5C">
                                        <input
                                            id="5C"
                                            value="Networking (Building and developing professional connections)"
                                            name="questionFive"
                                            type="radio"
                                            onChange={questionFive}
                                            checked={fivecheck == 'Networking (Building and developing professional connections)'} />
                                        <div className='custom_radio'></div>
                                        Networking (Building and developing professional connections) </label>
                                </li>
                                <li>
                                    <label htmlFor="5D">
                                        <input
                                            id="5D"
                                            value="Marketing (Lead generation)"
                                            name="questionFive"
                                            type="radio"
                                            onChange={questionFive}
                                            checked={fivecheck == 'Marketing (Lead generation)'} />
                                        <div className='custom_radio'></div>
                                        Marketing (Lead generation) </label>
                                </li>
                                <li>
                                    <label htmlFor="5E">
                                        <input
                                            id="5E"
                                            value="Scaling up (Expansion)"
                                            name="questionFive"
                                            type="radio"
                                            onChange={questionFive}
                                            checked={fivecheck == 'Scaling up (Expansion)'} />
                                        <div className='custom_radio'></div>
                                        Scaling up (Expansion) </label>
                                </li>
                                <li>
                                    <label htmlFor="5F">
                                        <input
                                            id="5F"
                                            value="Any other"
                                            name="questionFive"
                                            type="radio"
                                            onChange={questionFive}
                                            checked={fivecheck == 'Any other'} />
                                        <div className='custom_radio'></div>
                                        Any other</label>
                                </li>

                                {fivecheck==="Any other" && (  <li>
                                        <input type="text"
                                             id="fiveInput"
                                            value={fiveQuestionInput}
                                            name="questionThree"
                                            placeholder='Answer input'
                                            required
                                            onChange={(event) => {
                                                setFiveQuestionInput(event.target.value)
                                            }} />
                                </li> )}
                                
                             
                          

                               

                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div>

                        {/* 6th question */}
                        <div className="form-row radio-buttons">
                            <h2>6. In personal life, in which area would you like to extend your help or guidance?</h2>
                            <ul>

                                <li>

                                    <label htmlFor="6A">
                                        <input
                                            id="6A"
                                            value="Generating wealth"
                                            name="questionSix"
                                            type="radio"
                                            onChange={questionSix}
                                            checked={sixcheck == 'Generating wealth'} />
                                        <div className='custom_radio'></div>
                                        Generating wealth </label>
                                </li>
                                <li>
                                    <label htmlFor="6B">
                                        <input
                                            id="6B"
                                            value="Holistic health"
                                            name="questionSix"
                                            type="radio"
                                            onChange={questionSix}
                                            checked={sixcheck == 'Holistic health'} />
                                        <div className='custom_radio'></div>
                                        Holistic health</label>
                                </li>
                                <li>
                                    <label htmlFor="6C">
                                        <input
                                            id="6C"
                                            value="Relationship counselling"
                                            name="questionSix"
                                            type="radio"
                                            onChange={questionSix}
                                            checked={sixcheck == 'Relationship counselling'} />
                                        <div className='custom_radio'></div>
                                        Relationship counselling</label>
                                </li>
                                <li>
                                    <label htmlFor="6D">
                                        <input
                                            id="6D"
                                            value="All of the above"
                                            name="questionSix"
                                            type="radio"
                                            onChange={questionSix}
                                            checked={sixcheck == 'All of the above'} />
                                        <div className='custom_radio'></div>
                                        All of the above </label>
                                </li>
                               

                              
                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div>

                        {/* 7th multiple check box */}
                        <div className="form-row radio-buttons">
                            <h2>7. According to you, wealth is</h2>
                            <ul>

                                {/* <li>
                                    <label htmlFor="7A">
                                        <input
                                            id="7A"
                                           name="AllSelect"
                                            type="checkbox"
                                            onChange={questionSeven}
                                           
                                             />
 
                                         All Select </label>
                                </li> */}

                                <li className='checkbox-style'>
                                    {sevencheck && sevencheck.map((sevendata)=>(
                                    <>

                                    <div > 
 
                                                <input

                                                    id={sevendata.name}
                                                    value={sevendata}
                                                    name={sevendata.name}
                                                    checked={sevendata?.isChecked || false }
                                                    type="checkbox"
                                                    // required
                                                    onChange={questionSeven} />
                                            
                                                <label  className='checkbox-label' htmlFor={sevendata.name}> {sevendata.name} </label>
                                    </div>
                                    </>
                                    ))}
                                </li>
                           

                              
                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div>

                        {/* 8th question */}
                        <div className="form-row radio-buttons">
                            <h2>8. In professional life, in which area would you like to extend your help or guidance?</h2>
                            <ul>

                                <li>

                                    <label htmlFor="8A">
                                        <input
                                            id="8A"
                                            value="Enhancing skills and capabilities"
                                            name="questionEight"
                                            type="radio"
                                            onChange={questionEight}
                                            checked={eightcheck == 'Enhancing skills and capabilities'} />
                                        <div className='custom_radio'></div>
                                        Enhancing skills and capabilities </label>
                                </li>
                                <li>
                                    <label htmlFor="8B">
                                        <input
                                            id="8B"
                                            value="Increase in professional earnings"
                                            name="questionEight"
                                            type="radio"
                                            onChange={questionEight}
                                            checked={eightcheck == 'Increase in professional earnings'} />
                                        <div className='custom_radio'></div>
                                        Increase in professional earnings</label>
                                </li>
                                <li>
                                    <label htmlFor="8C">
                                        <input
                                            id="8C"
                                            value="Building and developing professional connections"
                                            name="questionEight"
                                            type="radio"
                                            onChange={questionEight}
                                            checked={eightcheck == 'Building and developing professional connections'} />
                                        <div className='custom_radio'></div>
                                        Building and developing professional connections</label>
                                </li>
                                <li>
                                    <label htmlFor="8D">
                                        <input
                                            id="8D"
                                            value="All of the above"
                                            name="questionEight"
                                            type="radio"
                                            onChange={questionEight}
                                            checked={eightcheck == 'All of the above'} />
                                        <div className='custom_radio'></div>
                                        All of the above</label>
                                </li>
                                <li>
                                    <label htmlFor="8E">
                                        <input
                                            id="8E"
                                            value="Any other"
                                            name="questionEight"
                                            type="radio"
                                            onChange={questionEight}
                                            checked={eightcheck == 'Any other'} />
                                        <div className='custom_radio'></div>
                                        Any other</label>
                                </li>
                                {eightcheck==="Any other" && (  <li>
                                        <input type="text"
                                             id="eightInput"
                                            value={eightQuestionInput}
                                            name="questionEight"
                                            placeholder='Answer input'
                                            required
                                            onChange={(event) => {
                                                setEightQuestionInput(event.target.value)
                                            }} />
                                </li> )}

                              
                            </ul>
                            {
                                error ? <div className="error"><p>this is required</p></div> : null
                            }

                        </div>


                    {/* submit button */}
                    <div>
                        <button
                            type="submit"
                            // onClick={CreatForm}
                        >Submit
                        </button>
                    </div>

                </form>
            </div>
    }

    {/* form end here */}

        </section>
    </>
  )
}

export default RegistrationForm