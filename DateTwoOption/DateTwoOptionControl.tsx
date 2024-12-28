import * as React from "react";
import { ChangeEvent, useMemo} from "react";
import dayjs from "dayjs";
import { Checkbox, CheckboxOnChangeData, FluentProvider, IdPrefixProvider, Input, makeStyles, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import { LockMultipleRegular } from '@fluentui/react-icons';

export interface IProps {
    
    //properties
    instanceId: string;
    checkeddate: Date|undefined;
    offset:number;
    format : string;
    showdate:boolean,
    showdatetext:string,
    lockafterchecked:boolean,
    readonly: boolean;
    masked: boolean;
    isDarkMode:boolean;


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
    const onChange = (ev: ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData): void => {
        
        let ischecked:boolean = !!data.checked;
        props.onChange(ischecked ? new Date() : undefined);
    };
    


    return (
        
        <IdPrefixProvider value={`date-two-option-${props.instanceId}-`}>
            <FluentProvider theme={props.isDarkMode ? webDarkTheme : webLightTheme} >

            {props.masked ?
                <Input
                    contentBefore={<LockMultipleRegular />}
                    type="password"
                    value="*********"
                    readOnly={true}
                    style={{width:"100%"}} 
                    appearance="filled-darker"
                />
                :
                <Checkbox 
                    label={checkedOnLabel}  
                    checked={props.checkeddate !== undefined} 
                    onChange={onChange} 
                    disabled={props.readonly || (props.checkeddate !== undefined && props.lockafterchecked)}
                />
                
            }
            </FluentProvider>
        </IdPrefixProvider >  
    ) 
}
export default DateTwoOptionControl;



