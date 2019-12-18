<?php
if(isset($_POST["objects"]))
{
	// convert the objects to association array
 	$events=json_decode($_POST["objects"],true);
	//connect tot the database
  	$con=mysqli_connect("localhost","root","","web_2_version_2");
	// if not connected
	if(!$con)
	{
		die($con->connect_error);
	}
	// loop on the objects that exists
	for($i=0;$i<count($events);$i++)
	{	
		$arr_Object=[];
		// split the objects (if the object repeated many times)
		//$arr=$event[$i].str_split(","); //////   why not working
		$arr_Object=explode("&",$events[$i]);
		// loop on each object to split it
		for($j=0;$j<count($arr_Object);$j++)
		{
			$arr_details=[];
			// split each object 
			$arr_details=explode("///",$arr_Object[$j]);
			// insertion into the database
			$q=mysqli_query($con,"Insert into events values('$arr_details[0]','$arr_details[1]','$arr_details[2]')");
			if(!$q)
			{
				echo " Error in Insertion";
			}
			else
			{
				echo " Insert successfuly";
			}
		}
		
	}
	
}

if(isset($_GET["object"]))
{
	//connect tot the database
	 $con=mysqli_connect("localhost","root","","web_2_version_2");
	 // if not connected
	 if(!$con)
		{
			die($con->connect_error);
		}
	// query yo get the data from the table
	$sql="select * from events";
	// execute the guery 
	$result=mysqli_query($con,$sql);
	// if not null or has rows
		if($result -> num_rows >0)
		{
			$rows=array();
			// get each row of the ruselt and store it on the $rows 
			while($row = $result->fetch_assoc())
			{
				array_push($rows,$row);
			}
			// convert to JSON before sending to the js file
			echo json_encode($rows);
		}
		else
		{
			echo "There an error in retriving the data";
		}
}
?>