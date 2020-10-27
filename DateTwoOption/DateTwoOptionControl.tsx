import * as React from "react";

//declaring fluentui library independently will produce a lighter bundle
import { mergeStyles} from "@fluentui/react/lib/Styling"; 
import { Stack } from "@fluentui/react/lib/Stack";
import { TextField } from "@fluentui/react/lib/TextField";
import { Checkbox } from "@fluentui/react/lib/Checkbox";
import { initializeIcons } from "@fluentui/react/lib/Icons"; 
import { FontIcon} from "@fluentui/react/lib/Icon"; 


import { useMemo} from "react";
import dayjs from "dayjs";

initializeIcons();

export interface IProps {
    
    //properties
    checkeddate: Date|undefined;
    offset:number;
    format : string;
    showdate:boolean,
    showdatetext:string,
    lockafterchecked:boolean,
    readonly: boolean;
    masked: boolean;


    //return function
    onChange: (checkedon:Date|undefined) => void;
}


const DateTwoOptionControl = (props:IProps): JSX.Element => {


    const checkedOnLabel = useMemo<string>(() =>{
        return props.checkeddate !== undefined ? 
                    props.showdatetext + 
                        (props.showdatetext.length > 0 ? " " : "") + 
                        dayjs(props.checkeddate).subtract(props.offset,"minute").format(props.format) :
                    ""
    },[props.checkeddate,props.showdatetext,props.offset,props.format])


    //EVENT HANDLER => Signal back to PCF
    const onChange = (ev?: React.FormEvent<HTMLElement>, checked?: boolean): void => {
        
        let ischecked:boolean = !!checked;
        props.onChange(ischecked ? new Date() : undefined);
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
                    label={checkedOnLabel}  
                    checked={props.checkeddate !== undefined} 
                    onChange={onChange} 
                    disabled={props.readonly || (props.checkeddate !== undefined && props.lockafterchecked)}
                />
            </Stack>
        );
    }       
     
}
export default DateTwoOptionControl;



