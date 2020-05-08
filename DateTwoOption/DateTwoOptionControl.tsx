import * as React from "react";
import { Stack, TextField,Checkbox,FontIcon,initializeIcons,mergeStyles} from "@fluentui/react"; 
import { useState, useEffect} from "react";
import {useConst} from "@uifabric/react-hooks";
import moment, { Moment } from 'moment';


export interface IProps {
    
    //properties
    checkeddate: Moment|undefined;
    format : string;
    showdate:boolean,
    showdatetext:string,
    lockafterchecked:boolean,
    readonly: boolean;
    masked: boolean;


    //return function
    onChange: (rating:Moment|undefined) => void;
}


const DateTwoOptionControl = (props:IProps): JSX.Element => {

    //Will run once on first render, like a constructor
    useConst(() => {
        initializeIcons();
    });
    
    const [checkedOn, setCheckedOn] = useState<Moment|undefined>(props.checkeddate);
    const [checkedOnLabel, setCheckedOnLabel] = useState<string>(props.checkeddate !== undefined ? 
                                                                            props.showdatetext + 
                                                                                (props.showdatetext.length > 0 ? " " : "") + 
                                                                                    props.checkeddate.format(props.format) :
                                                                            "");
    //EFFECT HOOKS
    useEffect(() => {

        if(checkedOn !== props.checkeddate){
            
            props.onChange(checkedOn);
        }

    }, [checkedOn]);  //WHEN isChecked changes, 

    useEffect(() => {

        if(checkedOn !== props.checkeddate){
            setCheckedOn(props.checkeddate);
            setCheckedOnLabel(props.checkeddate !== undefined ? 
                                props.showdatetext + 
                                    (props.showdatetext.length > 0 ? " " : "") + 
                                        props.checkeddate.format(props.format) :
                                "");
        }

    }, [props.checkeddate]);  //WHEN props.checkeddate changes changes, 
     
    
    //EVENT HANDLER
    const onChange = (ev?: React.FormEvent<HTMLElement>, checked?: boolean): void => {
        let ischecked:boolean = !!checked;

        if(ischecked){
            
            let current = moment();
            setCheckedOn(current);
            setCheckedOnLabel(props.showdatetext + 
                                (props.showdatetext.length > 0 ? " " : "") + 
                                    current.format(props.format) );
        }else{
            
            setCheckedOn(undefined);
            setCheckedOnLabel("");
        }

    };
    
    //Styles
    const stackTokens = { childrenGap: 10 };

    const maskedclass = mergeStyles({
        fontSize: 30,
        height: 30,
        width: 50,
        margin: "1px",      
    });

    if(props.masked){
        return(
            <Stack tokens={{ childrenGap: 2 }} horizontal>
                <FontIcon iconName="Lock" className={maskedclass} />     
                <TextField value="*********" style={{width:"100%"}}/>
            </Stack>
        )
    }else{
        return (

            <Stack tokens={stackTokens} horizontal>
                <Checkbox 
                    label={props.showdate ? checkedOnLabel : ""}  
                    checked={checkedOn !== undefined} 
                    onChange={onChange} 
                    disabled={props.readonly || (checkedOn !== undefined && props.lockafterchecked)}
                />
            </Stack>
        );
    }       
     
}
export default DateTwoOptionControl;



