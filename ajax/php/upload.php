<?php
chdir('../../');
require_once 'core/init.php';
$DATA->parse_pin_files();

if ( isset($_FILES) && !empty($_FILES) ) {
  //$DATA->parse_csv( $_FILES['lfile']['tmp_name'], $_POST['type'], $_POST['points'], $_POST['action'] );
}
else;
?>
<div class="upload">
  <p>
  Upload a CSV file for batch import here. The CSV file must be in the following
  format in order to be accepted and parsed properly. Make sure to choose the
  appropriate action for the file and specify the points of access to be added/removed.
  <br/>
  <br/>
  LASTNAME,FIRSTNAME,CARDNUMBER,PIN
  </p>
  <form id="upload_form" enctype="multipart/form-data">
  <div>
    <input id="lfile" type="file" name="lfile" accept="text/csv"></input>
  </div>
  <div>
    <span>Type</span>
    <select id="type" name="type">
      <?php
      foreach ($DATA->types as $fname => $type) {
      ?>
      <option value="<?php echo $fname;?>"><?php echo $type;?></option>
      <?php
      }
      ?>
    </select>
  </div>
  <div>
    <span>Groups or Access Points</span>
    <br />
    <textarea id="points" placeholder="groups and/or access points separated by a comma."><?php if(isset($user)) echo $user->groups;?></textarea>
    <span id="point_errors"></span>
  </div>
  <div>
    <input type="radio" name="action" value="add"></input>
      <label>Add</label>

    <input type="radio" name="action" value="remove"></input>
      <label>Remove</label>
  </div>
  </form>
  <div>
    <button id="upload">Upload</button>
  </div>
</div>