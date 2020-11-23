import React, { Component } from 'react';
import { render } from "react-dom";
import { Button } from '@rmwc/button';
import { Formik, FieldArray, Form } from "formik/dist/index";
import * as Yup from 'yup';
import { GridCell, GridInner } from '@rmwc/grid'
import { openDialog } from '../../actions/dialog';
import GetUser from './GetUser';
import { getUser, updateUser } from '../../api/userCalls';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';


const categories = [
  { id: 0, name: "All" },
  { id: 1, name: "Orchestra Admin" },
  { id: 2, name: "List Orchestra Signups # Not used atm!" },
  { id: 3, name: "Modify Arrticles" },
  { id: 4, name: "List Users" },
  { id: 5, name: "Modify Users" },
  { id: 6, name: "Delete Users" },
  { id: 7, name: "List Cortege Applications" },
  { id: 8, name: "Approve Cortege Applications" },
  { id: 9, name: "List Funkis Applications" },
  { id: 10, name: "Analyst" },
  { id: 11, name: "Ticketer" },
  { id: 12, name: "Editor" }
];

const divStyle = {
  margin: '40px'
};

class CheckboxAdminPermissions extends Component {
  constructor(props){
    super(props);
  }

  convertPermissionsToList(integer_value) {
    var permission_list = []
    var prev_value   = integer_value;
    var currentValue = integer_value;
    var i = 1;
    while(currentValue > 0){
      currentValue = (integer_value >> i);
      if(prev_value != currentValue)
        permission_list.push(i-1);
      i++;
      prev_value = currentValue;
    }
    return permission_list;
  }

  render(){
    Permissions = this.convertPermissionsToList(this.props.groundPermissions);
    return (<Formik
      initialValues={ {Permissions}  }
      onSubmit={this.props.changePermissions}
      render={({ values, handleChange, handleBlur, errors, touched, isValid, isSubmitting}) => (
        <Form style={{width: '100%'}} className='update-admin-permissions'>
          <FieldArray
            name="Permissions"
            render={arrayHelpers => (
              <React.Fragment>
                {categories.map(category => (
                  <div key={category.id}>
                    <label>
                      <input
                        name="Permissions"
                        type="checkbox"
                        value={category.id}
                        checked={values.Permissions.includes(category.id)}
                        onChange={e => {
                          if (e.target.checked) arrayHelpers.push(category.id);
                          else {
                            const idx = values.Permissions.indexOf(category.id);
                            arrayHelpers.remove(idx);
                          }
                        }}
                      />{""}
                      {category.name}
                    </label>
                  </div>
                ))}
              </React.Fragment>
            )}
          />
          <GridInner style={{"margin-top":'10px'}}>
            <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
              <Button raised type='submit' style={{width: '100%'}} disabled={!isValid || isSubmitting }>
                Change admin permissions
              </Button>
            </GridCell>
            <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
              <Button raised type='reset' style={{width: '100%'}} disabled={!isValid} >
                Reset
              </Button>
            </GridCell>
          </GridInner>
        </Form>
      )}
    />);
  }
}



class PermissionModifier extends Component{

  constructor(props){
    super(props);

    this.state = {user: null, open : false, message : ""}
    this.changePermissions = this.changePermissions.bind(this);
    this.resetState = this.resetState.bind(this);
  }


  getUserCallback = (user) => {
    this.setState({user: user});
  }

  changePermissions(values, bag) {

    // Calculate what value the admin_permission:int should have in DB
    var sum = values.Permissions.reduce(
      (accumulator, currentValue) =>
      accumulator + Math.pow(2, currentValue), 0
    );
    const input = {
      id: this.state.user.id,
      displayName: this.state.display_name,
      adminPermissions: sum,
      usergroup: this.state.usergroup,
      rebateBalance: this.state.rebate_balance
    }

    updateUser(input)
      .then(response => {
        this.setState({open: true, message:response.data.message})
      })
      .catch(error => {
        this.setState({open:true, message: "Could not update user, please try again" })
      })

    bag.setSubmitting(false);
    this.resetState();
  }

  resetState() {
    this.setState({user : null})
  }



  render(){
    return(
      <React.Fragment>
        <Dialog
          open={this.state.open}
          onClose={() => this.setState({open : false})}
          className='unclickable-scrim-dialog'>
          <DialogTitle> Admin update! </DialogTitle>
          <DialogContent>
            {this.state.message}
          </DialogContent>
          <DialogActions>
            <DialogButton action="close" type='button' isDefaultAction>Close</DialogButton>
          </DialogActions>
        </Dialog>
        {(this.state.user !== null)
        ?
          <React.Fragment>
            <h5> Ändrar rättigheter för {this.state.user.uid} </h5>
            <CheckboxAdminPermissions changePermissions = {this.changePermissions}
              groundPermissions = {this.state.user.admin_permissions} />
            <GridInner>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center' style={{"margin-top":'10px'}}>
              <Button raised onClick = {this.resetState} style={{width:'100%'}}>
              Byt användare
              </Button>
              </GridCell>
            </GridInner>
          </React.Fragment>
        :
          <React.Fragment>
            <GetUser getUserCallback = {this.getUserCallback} />
          </React.Fragment>
        }
      </React.Fragment>
    );
  };
}

export default PermissionModifier;
