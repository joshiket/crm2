<?php
class Customers
{
		private $mtable = "";
		private $ctable = "";
		private $mview = "";
		private $cview = "";
		private $dbConfig = array();
		private $messages = array();
		private $primaryKey = "";
		private $properties;

		public function __constructor()
		{
			$this->dbConfig = json_decode(file_get_contents('../db.json'));
			$this->messages = json_decode(file_get_contents('Customers_msg.ini'));
			$this->mtable = "Customers";
			$this->ctable = "";
			$this->mview = "";
			$this->cview = "";
			$primaryKey = "custId";
		}//constructor

		public function __set($property,$value)
		{
			if($property == 'custId' ||$property == 'lastName' ||$property == 'firstName' ||$property == 'cellPhone' ||$property == 'bdate' ||$property == 'dispPic' )
			{
				$this->properties[$property] = $value;
			}
		}//__set

		public function __get($property)
		{
			if(array_key_exists($property ,$properties))
				return $this->properties[$property];
			else
				return NULL;
		} //__get()

		public function generateResponse($error, $message, $data=false)
		{
			$msg = array();
			$msg['error'] = $error;
			if($data)
				$msg['data'] = $data;
			else
				$msg['msg'] = $message;
			return json_encode($msg);
		} //getGenerateResponse()

		public function getDBConnection()
		{
			try
			{
				$dsn = sprintf("mysql:host=%s;dbname=%s",$this->dbConfig->server, $this->dbConfig->dbname);
				$config = array( PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,PDO::ATTR_PERSISTENT => true);
				$conn = new PDO($dsn,$this->dbConfig->user,$this->dbConfig->pass,$config);
				return $conn;
			} //try
			catch(PDOException $ex)
			{
				return NULL ;
			}
		}// getDBConnection()

		public function fetch($customQuery = null, $fieldList = "*", $where = "",$orderBy="",$limit="")
		{
			$msg="";
			$query="";
			$query = ($customQuery != null) ? $customQuery : "select";
			$query .= $fieldList ;
			$query .= $where  ;
			$query .= $orderBy  ;
			$query .= $limit  ;
			$dbCon = $this->getDBConnection();
			try
			{
				$stmt = $dbCon->prepare($query);
				$stmt->execute();
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
				$msg = $this->generateResponse(false, json_encode($result),true);
				$dbCon = null;
				http_response_code(200);					return $msg;
			}//try
			catch(PDOException $ex)
			{
				$msg = $this->generateResponse(true, $ex->getMessage());
				$dbCon = null;
				http_response_code(404);					return $msg;
			} //catch
		} // get()

		public function insert()
		{
			$msg="";
			$query = sprintf("INSERT INTO % s VALUES(NULL, '%s', '%s', '%s', '%s', '%s')",$this->table, $this->lastName, $this->firstName, $this->cellPhone, $this->bdate, $this->dispPic);
			$dbCon = $this->getDBConnection();
			try
			{
				$stmt = $dbCon->prepare($query);
				$stmt->execute();
				$msg = $this->generateResponse(false, $this->messages->insupd);
				$dbCon = null;
				return $msg;
			}//try
			catch(PDOException $ex)
			{
				$msg = $this->generateResponse(true, $ex->getMessage());
				$dbCon = null;
				return $msg;
			} //catch
		} // insert()

		public function update()
		{
			$msg="";
			$query = sprintf("UPDATE %s set lastName = '%s',firstName = '%s',cellPhone = '%s',bdate = '%s',dispPic = '%s WHERE ' $this->primaryKey = %d",lastName = '%s',firstName = '%s',cellPhone);
			$dbCon = $this->getDBConnection();
			try
			{
				$stmt = $dbCon->prepare($query);
				$stmt->execute();
				$msg = $this->generateResponse(false, $this->messages->insupd);
				$dbCon = null;
				return $msg;
			}//try
			catch(PDOException $ex)
			{
				$msg = $this->generateResponse(true, $ex->getMessage());
				$dbCon = null;
				return $msg;
			} //catch
		} // update()

		public function delete()
		{
			$msg="";
			$query = sprintf("DELETE FROM %s WHERE custId= %d",$this->table, $this->custId);
			$dbCon = $this->getDBConnection();
			try
			{
				$stmt = $dbCon->prepare($query);
				$stmt->execute();
				$msg = $this->generateResponse(false, $this->messages->del);
				$dbCon = null;
				return $msg;
			}//try
			catch(PDOException $ex)
			{
				$msg = $this->generateResponse(true, $ex->getMessage());
				$dbCon = null;
				return $msg;
			}//catch
		} //delete()

	} // class

?>
