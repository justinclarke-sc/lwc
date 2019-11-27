import { LightningElement, api, track, wire } from 'lwc';

/* eslint-disable no-console */

// getRecord wire service
import { getRecord } from 'lightning/uiRecordApi';

// fields to query via the getRecord wire method
const ACCOUNT_FIELDS = ['Account.PersonContactId', 'Account.FirstName', 'Account.LastName', 'Account.Industry', 'Account.Classification__pc'];

export default class getPersonAccountStrings extends LightningElement {

    // the record id of the page this is embedded on
    @api recordId;

    // person account fields
    @track personContactId;
    @track firstName;
    @track lastName;
    @track classification;
    
    @wire(getRecord, {
        recordId: '$recordId',
        fields: ACCOUNT_FIELDS
    }) wiregetRecordAccount({error, data}) {
    
        console.log('getPersonAccountStrings.getRecordAccount wire method called');
    
        if (error) {
    
            console.log('getPersonAccountStrings.getRecordAccount: error: ', JSON.stringify(error));
    
        } else if (data != undefined && data != null) {

            console.log('getPersonAccountStrings.getRecordAccount: data: ', JSON.stringify(data));

            this.personContactId = data.fields['PersonContactId'].value;
            this.firstName = data.fields['FirstName'].value;
            this.lastName = data.fields['LastName'].value;
            this.classification = data.fields['Classification__pc'].value;
        }
    }

}