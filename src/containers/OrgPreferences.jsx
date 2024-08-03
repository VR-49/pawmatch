import React from 'react';

const OrgPreferences = () => {

	return (
  <div>
		<form>
			<label for='orgName'>Organization Name: </label>
			<input type='text' name='orgName'/>
			<label for='location'>Address</label>
			<label for='bio'>About Organization</label>
			<textarea name='bio' rows={5} cols={70}/>
			
		</form>
	</div>
	)
}

export default OrgPreferences;