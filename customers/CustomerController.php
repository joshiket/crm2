<?php
    /*spl_autoload_register(function ($class)
	{
		include $class.'class.php';
	}*/

	require_once "Customer.class.php";

	class CustomerController
	{
			private $request = "";
			private $method = "";
			public function __constructor()
			{
				$this->request = file_get_contents("php://input");
				$this->request = json_decode($this->request);
				$this->method = $_SERVER['REQUEST_METHOD'];
				$this->processAction();
			}//constructor

			public function fetchData($var)
			{
				$d = (isset($this->requests->$var)) ? $this->request->$var : NULL;
				return $d;
			} //fetchData()

			public function processAction()
			{
				$msg="";
				$obj = new Customer();
				switch($this->method)
				{
					case ("GET" && ! isset($this->request->$custId)) : 
						$msg = $this->get();
						break;
					case ("GET" && isset($this->request->$custId)) : 
						$msg = $this->getById();
						break;
					case ("POST") : 
						$msg = $this->create();
						break;
					case ("PUT") : 
						$msg = $this->update();
						break;
					case ("DELETE") : 
						$msg = $this->delete();
						break;
				}//switch
				return $msg;
			}//processAction()

			public function get()
			{
				$obj = new Customer();
				$msg = $obj->fetch(NULL ,'','','','');
				return $msg;
			}//get()

			public function getById()
			{
				$msg = "";
				$custId = $this->fetchData("custId");
				if( custId == NULL )
				{
					$msg = $this->RANS();
				}//if
				else
				{
					$obj = new Customer();
					$obj->custId = $custId;
					$msg = $obj->fetch(NULL,'*','WHERE custId = $custId','','');
				}//else
				return $msg;
			}//getById()

			public function delete()
			{
				$msg = "";
				$custId = $this->fetchData("custId");
				if( custId == NULL )
				{
					$msg = $this->RANS();
				}//if
				else
				{
					$obj = new Customer();
					$obj->custId = $custId;
					$msg = $obj->delete();
				}//else
				return $msg;
			}//delete()

			public function update()
			{
				$msg = "";
				$custId = $this->fetchData("custId");
				$lastName = $this->fetchData("lastName");
				$firstName = $this->fetchData("firstName");
				$cellPhone = $this->fetchData("cellPhone");
				$bdate = $this->fetchData("bdate");
				$dispPic = $this->fetchData("dispPic");
				if( custId == NULL || lastName == NULL || firstName == NULL || cellPhone == NULL || bdate == NULL || dispPic == NULL )
				{
					$msg = $this->RANS();
				}//if
				else
				{
					$obj->custId = $custId;
					$obj->lastName = $lastName;
					$obj->firstName = $firstName;
					$obj->cellPhone = $cellPhone;
					$obj->bdate = $bdate;
					$obj->dispPic = $dispPic;
					$msg = $obj->update();
				}//else
				return $msg;
			}//update()

			public function insert()
			{
				$msg = "";
				$lastName = $this->fetchData("lastName");
				$firstName = $this->fetchData("firstName");
				$cellPhone = $this->fetchData("cellPhone");
				$bdate = $this->fetchData("bdate");
				$dispPic = $this->fetchData("dispPic");
				if( lastName == NULL || firstName == NULL || cellPhone == NULL || bdate == NULL || dispPic == NULL )
				{
					$msg = $this->RANS();
				}//if
				else
				{
					$obj->lastName = $lastName;
					$obj->firstName = $firstName;
					$obj->cellPhone = $cellPhone;
					$obj->bdate = $bdate;
					$obj->dispPic = $dispPic;
					$msg = $obj->insert();
				}//else
				return $msg;
			}//insert()

	}//class

?>