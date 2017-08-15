<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\helpers\Html;
use app\models\FormSearch;
use yii\db\Query;
use yii\db\ActiveQuery;
use yii\rest\ActiveController;
use app\models\Usuario;
use app\models\UsuarioSearch;
use app\models\Emergencia;
use app\models\EmergenciaSearch;
use app\models\Grifo;
use app\models\GrifoSearch;
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');

class ApiController extends ActiveController
{
	public $modelClass = '';

	public function actionUsuario(){
		if(isset($_GET['usu'])&&isset($_GET['pas'])){
            $rut=$_REQUEST['usu'];
            $password=$_REQUEST['pas'];
            
            $query = 'SELECT * FROM usuario WHERE login_usuario = "'.$rut.'" AND contrasena_usuario = "'.$password.'"';
            $command= yii::$app->db->createCommand($query)->queryAll();
            $count=count($command);
            
            if($count==1){
                foreach ($command as $item) {
                 $arr = ['respuesta' => 'true', 'nombre_usuario' => $item['nombre_usuario']];
                 }      
            }else{
                $arr=['respuesta'=>'false'];
            }
            $response = Yii::$app->response;
            $response->format = \yii\web\Response::FORMAT_JSON;
            $response->data = $arr;
            return $arr;
        }else{
            $arr=['respuesta'=>'false'];
        	$response = Yii::$app->response;
            $response->format = \yii\web\Response::FORMAT_JSON;
            $response->data = $arr;
            return 0;
        }
	}

    public function actionEmergencia(){

            $query = 'SELECT id_emergencia,descripcion,clave, direccion FROM emergencia JOIN tipo_emergencia WHERE emergencia.estado= 1 AND emergencia.tipo_emergencia=tipo_emergencia.id_tipo_emergencia';
            $command= yii::$app->db->createCommand($query)->queryAll();
            $count=count($command);

            if($count>=1){
                foreach ($command as $item) {
                 $arr[] = ['id_emergencia' => $item['id_emergencia'],'direccion' => $item['direccion'], 'descripcion' => $item['descripcion'], 
                 'clave' => $item['clave']];
                 }      
            }else{
                $arr[]=['respuesta'=>'false'];
            }
            $response = Yii::$app->response;
            $response->format = \yii\web\Response::FORMAT_JSON;
            $response->data = $arr;
            return $arr;
    }

    public function actionGrifos(){
        
        $misPuntos=Grifo::find()->asArray()->all();
        
             foreach ($misPuntos as $item) {
            $arr[] = ['id_grifo'=>$item['id_grifo'],'latitud'=>$item['latitud'], 'longitud' => $item['longitud'], 'direccionGrifo' => $item['direccion']];
        }
            
            
            $response = Yii::$app->response;
            $response->format = \yii\web\Response::FORMAT_JSON;
            $response->data = $arr;
            return $arr;
    }

    public function actionHola(){

        $id_emergencia = $_REQUEST['id'];
            
         $query = 'SELECT emergencia.direccion,emergencia.id_emergencia,emergencia.latitud,emergencia.longitud, grifo.latitud as latitudGrifo, grifo.longitud as longitudGrifo, grifo.direccion as direccionGrifo FROM emergencia, grifo WHERE id_emergencia="'.$id_emergencia.'" AND emergencia.estado = 1';


            $command= yii::$app->db->createCommand($query)->queryAll();
        
                foreach ($command as $item) {
                 $arr[] = ['direccion' => $item['direccion'],'latitudEmergencia' => $item['latitud'],
                 'longitudEmergencia' => $item['longitud'], 'latitudGrifo' => $item['latitudGrifo'], 'longitudGrifo' => $item['longitudGrifo'], 'direccionGrifo' => $item['direccionGrifo']];
                 }      
            $response = Yii::$app->response;
            $response->format = \yii\web\Response::FORMAT_JSON;
            $response->data = $arr;
            return $arr;
        }
}

