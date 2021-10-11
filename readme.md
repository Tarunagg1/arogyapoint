-- auth

1. Login post
domain/api/v1/admin/login : {
    email*
}

2. verify otp post
domain/api/v1/admin/verify : {
    email*,
    otp*
}


-- admin doctor

1. get all doctor [get req]
domain/api/v1/doctor : {

}

2. get doctor by id [get req]
domain/api/v1/doctor/:_id : {

}

3. add doctor [post req]
domain/api/v1/doctor/:_id : {
    authorization*
    dname *, demail *, dnumber *, fees *
}

4. delete doctor by id [delete req]
domain/api/v1/doctor/:_id : {
    authorization*
}

5. update doctor by id [put req]
domain/api/v1/doctor/:_id : {
    authorization*
}


6. revert doctor by id [put req]
domain/api/v1/doctor/revert/:_id : {
        authorization*
}



--- Book doctor

1. get all book doctor [get req]
domain/api/v1/doctor/bookdoctor : {
    authorization*
}

2. get book single doctor by id [get req]
domain/api/v1/doctor/bookdoctor/:_id : {
    authorization*
}

3. get book single doctor by uniqueid [get req]
domain/api/v1/doctor/bookdoctor/unique/:uniqueid : {
    authorization*
}

4. book doctor [post req]
domain/api/v1/doctor/bookdoctor : {
     doctorid *, 
     pname *, 
     pemail*, 
     pnumber *, 
     paymentmode *, 
     appointmentdate *
}

-------------------------------------------------------------------------------------------------

-- admin sample addition

1. get all sample [get req]
domain/api/v1/sample : {

}

2. get single sample by id [get req]
domain/api/v1/sample/:_id : {
    
}


3. add sample [post req]
domain/api/v1/sample : {
    authorization*
    samplename *, sampleprice *
}


4. delete sample [delete req]
domain/api/v1/sample/:_id : {
    authorization* 
}


5. update sample [put req]
domain/api/v1/sample/:_id : {
    authorization*
}



-- book sample addition

1. book sample [post req]
domain/api/v1/doctor/bookdoctor : {
   sampleid *, samplename *, patientname *, bookdate *, patientnumber *, testfee *,gender *
}

2. get all book sample [get req]
domain/api/v1/doctor/bookdoctor : {
        authorization*
}


3. get book sample by id [get req]
domain/api/v1/doctor/bookdoctor/:_id : {
            authorization*
}


4. get single book sample by uniqueid [get req]
domain/api/v1/doctor/bookdoctor/uniqueid/:uniqueid : {
        authorization*
}



















