<?php
include 'manifest.php';

$biao_user = "user";
$biao_chat = "chat";
$biao_pinglun = "pinglun";
$biao_shoucang = "shoucang";
$biao_dianzan  = "dianzan";
$filepath = "../files";
$biao_luntan = "luntan";


if($method == 'user_login_u'){
    $num1 = chaxun_num($biao_user,array('tj'=>array('username')));
    if($num1 == 0){
        // 注册
        charu($biao_user,'username,password');
        echo chaxun_one($biao_user,array('tj'=>array('username')));
    }else{
        // 登录
        echo chaxun_one($biao_user,array('tj'=>array('username','password')));
    }
}

if($method == 'user_login_p'){
    $num1 = chaxun_num($biao_user,array('tj'=>array('phone')));
    if($num1 == 0){
        // 注册
        charu($biao_user,'phone,password');
        echo chaxun_one($biao_user,array('tj'=>array('phone')));
    }else{
        // 登录
        echo chaxun_one($biao_user,array('tj'=>array('phone','password')));
    }
}

if($method == 'user_wxlogin'){
    $num1 = chaxun_num($biao_user,array('tj'=>array('wxid')));
    if($num1 == 0){
        // 注册
        charu($biao_user,'wxid,wxname,wxhead');
        echo chaxun_one($biao_user,array('tj'=>array('wxid')));
    }else{
        // 登录
        echo chaxun_one($biao_user,array('tj'=>array('wxid')));
    }
}



//单独登录的
if($method == 'user_onlogin'){
    echo chaxun_one($biao_user,array('tj'=>array('username','password')));
}

//单独注册的
if($method == 'user_onreg'){
    $n1 = chaxun_num($biao_user,array('tj'=>array('username')));
    if($n1 > 0){
        echo json_encode(array('code'=>301));  //已有此账号
    }else{
        charu($biao_user,'username,password');
        echo chaxun_one($biao_user,array('tj'=>array('username','password')));
    }
}

if($method == 'user_detail'){
    echo chaxun_one($biao_user,array('tj'=>'id'));
}


if($method == 'user_xiugai'){
    $id   = $post['id'];
    $arr = array();
    foreach($post as $key => $value){
        if($key!='id' && $key!='method' && $key !="biao"){
            array_push($arr,$key);
        }
    };
    echo xiugai($biao_user,$arr);
}


if($method == 'common_charu'){
    $biao = $post['biao'];
    $key = $post['key'];
    echo charu($biao,$key);
}

// 指定修改key
if($method == 'common_xiugai'){
    $biao = $post['biao'];
    $key = $post['key'];
    echo xiugai($biao,$key);
}

if($method == 'common_delete'){
    $biao = $post['biao'];
    $key = $post['key'] == null ? 'id' : $post['key'];
    echo shanchu($biao,$key);
}


// status为0的，一般用于表示正常
if($method == 'common_list_status'){
    $post['status'] = 0;
    $biao = $post['biao'];
        if($post['limit']){
          $limit = $post['limit'];
        }else{
          $limit = null;
      }
    if($post['order']){
        if($post['tj']){
            echo chaxunall($biao,array('order'=>$post['order'],'tj'=>$post['tj'].',status','limit'=>$limit));
        }else{
            echo chaxunall($biao,array('order'=>$post['order'],'tj'=>'status','limit'=>$limit));
        }
    }else{
        if($post['tj']){
            echo chaxunall($biao,array('tj'=>$post['tj'].',status','limit'=>$limit));
        }else{
            echo chaxunall($biao,array('tj'=>'status','limit'=>$limit));
        }
    }
}


// status为1的，一般用于软删除
if($method == 'common_delete_status'){
    $biao = $post['biao'];
    $post['status'] = 1;
    echo xiugai($biao,'status');
}



if($method == 'common_list'){
    $biao = $post['biao'];
    if($post['limit']){
      $limit = $post['limit'];
    }else{
      $limit = null;
    }
    if($post['order']){
        if($post['tj']){
            echo chaxunall($biao,array('order'=>$post['order'],'tj'=>$post['tj'],'limit'=>$limit));
        }else{
            echo chaxunall($biao,array('order'=>$post['order'],'limit'=>$limit));
        }
    }else{
        if($post['tj']){
            echo chaxunall($biao,array('tj'=>$post['tj'],'limit'=>$limit));
        }else{
            echo chaxunall($biao,array('limit'=>$limit));
        }
    }
}

if($method == 'common_detail'){
    $biao = $post['biao'];//获取POST请求中的"biao"参数，即要查询的表名
    $key = $post['tj'] == null ? 'id' : $post['tj'];//获取POST请求中的"tj"参数，即要查询的字段名。如果"tj"参数为空，则默认查询"id"字段
    echo chaxun_one($biao,array('tj'=>$key));//调用名为"chaxun_one"的函数，查询数据库中符合条件的一条记录，并将结果输出到页面上。函数的第一个参数为要查询的表名，第二个参数为查询条件，其中"tj"为要查询的字段名
}


// 传什么改什么
if($method == 'info_xiugai'){
    $biao = $post['biao'];
    $arr = array();
    foreach($post as $key => $value){
        if($key!='id' && $key!='method' && $key !="biao"){
            array_push($arr,$key);
        }
    };
    echo xiugai($biao,$arr);
}

// 传什么插入什么
if($method == 'info_charu'){
    $biao = $post['biao'];
    $arr = array();
    foreach($post as $key => $value){
        if($key!='id' && $key!='method' && $key !="biao"){
            array_push($arr,$key);
        }
    };
    echo charu($biao,$arr);
}


// 聊天表：uid1,uid2,neirong,code 要注意这里user表里的name和head要根据实际情况改一下

// 获取当前我正在跟谁聊天
if($method == 'chat_getchat'){
    $uid   = $post['uid'];
    $list  = chaxun_2("SELECT a.* FROM (SELECT * FROM $biao_chat where uid1 = $uid or uid2 = $uid  order by id desc) as a GROUP BY code");
    $count = count($list);
    for($i=0;$i<$count;$i++){
        $obj = $list[$i];
        $uid1 = $obj['uid1'];
        $uid2 = $obj['uid2'];
        $dfid = $uid1 == $uid ? $uid2 : $uid1;
        $duifang = $conn->query("SELECT nickname,head FROM user where id = $dfid")->fetch_assoc();
        $list[$i]['nickname'] = $duifang['nickname'];
        $list[$i]['head'] = $duifang['head'];
        $list[$i]['dfid'] = $dfid;
    }
    echo json_encode(array('code'=>200,'data'=>$list,'n'=>$count));
}

// 获取聊天细节
if($method == 'chat_getlist'){
    $uid1 = $post['uid1'];
    $uid2 = $post['uid2'];
    $code = $conn->query("SELECT code FROM $biao_chat where (uid1 = $uid1 and uid2 = $uid2) or (uid1= $uid2 and uid2= $uid1)");
    if($code ->num_rows==0){
        echo json_encode(array('code'=>200,'data'=>array()));
    }else{
        $c = $code->fetch_assoc()['code'];
        $sql = "SELECT u.nickname,u.head,c.img,c.neirong,c.uid1,c.uid2,c.code,c.id,c.addtime FROM $biao_user u,$biao_chat c where c.uid1 = u.id and c.code = $c order by c.id asc";
        echo chaxun($sql);
    }
   
}

if($method == 'chat_send'){
    $uid1 = $post['uid1'];
    $uid2 = $post['uid2'];
    // 先看聊过天没
    $codenum = $conn->query("SELECT code FROM $biao_chat where (uid1 = $uid1 and uid2 = $uid2) or (uid1= $uid2 and uid2= $uid1) limit 1");
    if($codenum->num_rows>0){
        $post['code'] = $codenum->fetch_assoc()['code'];
    }else{
        $post['code'] = time();
    }
    echo charu($biao_chat,'uid1,uid2,neirong,code,img');
}

if($method == 'chat_getnew'){
    $code = $post['code'];
    $skip = $post['skip'];
    $sql  = "SELECT u.nickname,u.head,c.img,c.neirong,c.addtime,c.uid1,c.uid2,c.id FROM $biao_user u,$biao_chat c where c.uid1 = u.id and c.code = '$code' and c.id > $skip";
    echo chaxun($sql);
}

if($method == 'chat_getname'){
    $id = $post['id'];
    $name = $conn->query("SELECT nickname FROM $biao_user where id = $id")->fetch_assoc()['nickname'];
    echo json_encode(array('code'=>200,'data'=>$name));
}


//评论的
if($method == 'pinglun_list'){
    $key = $post['key'];
    if($post['biao']){
       $biao = $post['biao'];
    }else{
       $biao = $biao_pinglun;
    }
    $tj  = $post[$key];
    $sql = "SELECT u.*,p.* FROM $biao p,user u where p." . $key . "='$tj' and p.uid = u.id order by p.id desc";
    echo chaxun($sql);
}

if($method == 'shoucang'){
    echo youwu($biao_shoucang,$post['key']);
}

if($method == 'dianzan'){
    echo youwu($biao_dianzan,$post['key']);
}

if($method == 'uptu') {
	$image=$post['base64'];
	$name=$post['name'];
	$imageName = $name.rand(11,99).'.png';
	if (strstr($image,",")) {
		$image = explode(',',$image);
		$image = $image[1];
	}
	$path = $filepath;
	$imageSrc= $path."/". $imageName;
	//图片名字
	$r = file_put_contents($imageSrc, base64_decode($image));
	//返回的是字节数
	if (!$r) {
		$tmparr1=array('data'=>null,"code"=>1,"msg"=>"图片生成失败");
		echo json_encode($tmparr1);
	} else {
		$tmparr2=array('data'=>$imageName,"code"=>200,"msg"=>"图片上传成功");
		echo json_encode($tmparr2);
	}
}


if($method == 'upfile'){
    $upfile = $_FILES['file'];
    $path = $filepath;
    if (@$files['error'] == 00) {
        // 判断文件类型
        $ext = strtolower(pathinfo(@$upfile['name'], PATHINFO_EXTENSION));
        if (!is_dir($path)) {
            mkdir($path, 0777, true);
        }
        $fileName = md5(uniqid(microtime(true), true)) . '.' . $ext;
        $destName = $path . "/" . $fileName;
        if (!move_uploaded_file($upfile['tmp_name'], $destName)) {
            echo "文件上传失败！";
        }
        
        $url=$fileName;
        echo json_encode(array('data'=>$url));
    } else {
        switch (@$upfile['error']) {
            case 1:
                echo "上传的文件超过了 php.ini 中 upload_max_filesize 选项限制的值";
                break;
            case 2:
                echo "上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值";
                break;
            case 3:
                echo "文件只有部分被上传";
                break;
            case 4:
                echo "没有文件被上传";
                break;
            case 6:
            case 7:
                echo "系统错误";
                break;
        }
    }
}




if($method == 'weather'){
    $postdata = http_build_query(array(
  'key' => '88068006abfbd31cff8376b76b0285b4',
  'city' => $post['city']
));
  $options = array(
    'http' => array(
      'method' => 'POST',
      'header' => 'Content-type:application/x-www-form-urlencoded',
      'content' => $postdata,
      'timeout' => 15 * 60 // 超时时间（单位:s）
    )
  );
  $context = stream_context_create($options);
  $result = file_get_contents('http://apis.juhe.cn/simpleWeather/query', false, $context);
 
//   return $result;
  echo json_encode(array('code'=>200,'data'=>$result));
}


// 获取论坛列表，这里根据需要填写要不要收藏点赞评论的数量
if($method == 'luntan_getlist'){
    $uid = $post['uid'];
    $sql = "SELECT u.wxhead,u.wxname,l.*,(SELECT count(*) FROM $biao_dianzan where lid = l.id) as dianzan,(SELECT count(*) FROM $biao_pinglun where lid = l.id) as pinglun,(SELECT count(*) FROM $biao_shoucang where lid = l.id) as shoucang,(SELECT count(*) FROM $biao_dianzan where lid = l.id and uid = $uid) as mydianzan,(SELECT count(*) FROM $biao_shoucang where lid = l.id and uid = $uid) as myshoucang,(SELECT count(*) FROM $biao_pinglun where lid = l.id and uid = $uid) as mypinglun FROM luntan l,user u where l.uid = u.id order by l.id desc";
    echo chaxun($sql);
}

if($method == 'luntan_getlist_mine'){
    $uid = $post['uid'];
    $sql = "SELECT u.wxhead,u.wxname,l.*,(SELECT count(*) FROM $biao_dianzan where lid = l.id) as dianzan,(SELECT count(*) FROM $biao_pinglun where lid = l.id) as pinglun,(SELECT count(*) FROM $biao_shoucang where lid = l.id) as shoucang,(SELECT count(*) FROM $biao_dianzan where lid = l.id and uid = $uid) as mydianzan,(SELECT count(*) FROM $biao_shoucang where lid = l.id and uid = $uid) as myshoucang,(SELECT count(*) FROM $biao_pinglun where lid = l.id and uid = $uid) as mypinglun FROM luntan l,user u where l.uid = $uid and u.id = $uid order by l.id desc";
    echo chaxun($sql);
}

if($method == 'luntan_getlist_myshoucang'){
    $uid = $post['uid'];
    $sql = "SELECT u.wxhead,u.wxname,l.*,(SELECT count(*) FROM $biao_dianzan where lid = l.id) as dianzan,(SELECT count(*) FROM $biao_pinglun where lid = l.id) as pinglun,(SELECT count(*) FROM $biao_shoucang where lid = l.id) as shoucang,(SELECT count(*) FROM $biao_dianzan where lid = l.id and uid = $uid) as mydianzan,(SELECT count(*) FROM $biao_shoucang where lid = l.id and uid = $uid) as myshoucang,(SELECT count(*) FROM $biao_pinglun where lid = l.id and uid = $uid) as mypinglun FROM luntan l,user u where l.uid = u.id and (SELECT count(*) FROM $biao_shoucang where lid = l.id and uid = $uid) >0  order by l.id desc";
    echo chaxun($sql);
}


if($method == 'luntan_detail'){
    $lid = $post['id'];
    $uid = $post['uid'];
    $sql = "SELECT u.wxhead,u.wxname,l.*,(SELECT count(*) FROM $biao_dianzan where lid = $lid) as dianzan,(SELECT count(*) FROM $biao_pinglun where lid = $lid) as pinglun,(SELECT count(*) FROM $biao_shoucang where lid = $lid) as shoucang,(SELECT count(*) FROM $biao_dianzan where lid = l.id and uid = $uid) as mydianzan,(SELECT count(*) FROM $biao_shoucang where lid = l.id and uid = $uid) as myshoucang,(SELECT count(*) FROM $biao_pinglun where lid = l.id and uid = $uid) as mypinglun FROM luntan l,user u where l.uid = u.id and l.id = $lid order by l.id desc";
    echo json_encode(array('code'=>200,'data'=>$conn->query($sql)->fetch_assoc()));
}

if($method == 'sousuo'){
    $biao = $post['biao'];
    $key = $post['key'];
    $zhi = $post['value'];
    $sql = "SELECT * FROM $biao where " . $key . " like '%".$zhi."%'";
    echo chaxun($sql);
}

if($method == 'sousuo_status'){
    $biao = $post['biao'];
    $key = $post['key'];
    $zhi = $post['value'];
    $sql = "SELECT * FROM $biao where " . $key . " like '%".$zhi."%' and status = 0";
    echo chaxun($sql);
}


if($method == 'fenye_list'){
    $page=$post['page']-1;
    if($post['step']){
       $pagesize = $post['step'];
    }else{
       $pagesize = 15;
    }
	$start=$page * $pagesize;
	$biao = $post['biao'];
	$tiaojian = $post['tj'];
	$tj = '';
	if($tiaojian){
	    $tjlist = explode(',',$tiaojian);
	    $tjarr = array();
	    for ($i = 0;$i < count($tjlist);$i++) {
            $zhi = $tjlist[$i];
            array_push($tjarr, "$zhi='" . $post[$zhi] . "'");
        }
        $tj = $tj . " WHERE " . join(' and ', $tjarr);
	}
	$sql="SELECT SQL_CALC_FOUND_ROWS * FROM  $biao ".$tj." order by id DESC limit $start,$pagesize; ";
	$result=$conn->query($sql);
	$sql2="SELECT FOUND_ROWS();";
	$total=$conn->query($sql2)->fetch_assoc()['FOUND_ROWS()'];;
	$allpage= ceil($total / $pagesize);
	$arr=array();
	if($result->num_rows>0){
	    while($row=$result->fetch_assoc()){
	        array_push($arr,$row);
	    }
	}
    echo json_encode(array('total'=>$total,'data'=>$arr,'code'=>200,'allpage'=>$allpage));
}

if($method == 'fenye_list_status'){
    $page=$post['page']-1;
    if($post['step']){
       $pagesize = $post['step'];
    }else{
       $pagesize = 15;
    }
	$biao = $post['biao'];
	$tiaojian = $post['tj'];
	$tj = '';
	if($tiaojian){
	    $tjlist = explode(',',$tiaojian);
	    $tjarr = array();
	    for ($i = 0;$i < count($tjlist);$i++) {
            $zhi = $tjlist[$i];
            array_push($tjarr, "$zhi='" . $post[$zhi] . "'");
        }
        $tj = $tj . " WHERE " . join(' and ', $tjarr);
	}
	if($tj == ''){
	    $tj = " WHERE status = 0 ";
	}else{
	    $tj = $tj . " and status = 0 ";
	}
	$sql="SELECT SQL_CALC_FOUND_ROWS * FROM  $biao ".$tj." order by id DESC limit $start,$pagesize; ";
	$result=$conn->query($sql);
	$sql2="SELECT FOUND_ROWS();";
	$total=$conn->query($sql2)->fetch_assoc()['FOUND_ROWS()'];;
	$allpage= ceil($total / $pagesize);
	$arr=array();
	if($result->num_rows>0){
	    while($row=$result->fetch_assoc()){
	        array_push($arr,$row);
	    }
	}
    echo json_encode(array('total'=>$total,'data'=>$arr,'code'=>200,'allpage'=>$allpage));
}


//客服，表字段 = who,uid,neirong
if($method == 'kefu_getuser'){
    $sql = "SELECT c.uid,c.addtime,x.wxhead, x.wxname FROM (SELECT uid,addtime FROM kefu order by id desc ) as c,user x where x.id = c.uid group by uid";
    echo chaxun($sql);
}


if($method == 'kefu_getlist'){
    $uid = $post['uid'];
    $chat = chaxun_2("SELECT k.*,u.wxhead,u.wxname FROM kefu k,user u where k.uid = u.id and u.id = $uid");
    echo json_encode(array('code'=>200,'chat'=>$chat));
}


if($method == 'kefu_send'){
    echo charu('kefu',array('neirong','uid','who'));
}

if($method == 'kefu_sendimg'){
    echo charu('kefu',array('neirong','uid','who','img'));
}

if($method == 'kefu_skip'){
    $uid = $post['uid'];
    $skip = $post['skip'];
    $sql = "SELECT k.*,u.wxhead,u.wxname FROM kefu k,user u where k.uid = u.id and u.id = $uid and k.id > $skip";
    echo chaxun($sql);
}


$conn->close();
?>