import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { createElement } from 'react';
import { createRoot, Root } from 'react-dom/client';
import DateTwoOptionControl, {IProps} from "./DateTwoOptionControl";
import { v4 as uuidv4 } from 'uuid';



export class DateTwoOption implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _root: Root;
	private _notifyOutputChanged:() => void;

	private _checkeddate:Date|undefined;

	private _props:IProps = 
	{
		instanceId: uuidv4(),
		checkeddate:undefined,
		offset:0,
		format:"",
		showdate:true,
		showdatetext:"",
		lockafterchecked:false,
		readonly:false,
		masked:false,
		isDarkMode: false,

		onChange: this.notifyChange.bind(this)
	}
	
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this._notifyOutputChanged = notifyOutputChanged;
		this._root = createRoot(container!)
		
		this._props.isDarkMode = context.fluentDesignLanguage?.isDarkTheme ?? false;
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		
		// If the bound attribute is disabled because it is inactive or the user doesn't have access
		let isReadOnly = context.mode.isControlDisabled;

		let isMasked = false;
		// When a field has FLS enabled, the security property on the attribute parameter is set
		if (context.parameters.datetwooptionfield.security) {
			isReadOnly = isReadOnly || !context.parameters.datetwooptionfield.security.editable;
			isMasked = !context.parameters.datetwooptionfield.security.readable
		}
		
		let datetype = context.parameters.datetwooptionfield.type;
		let dateformat = context.parameters.overridedateformat.raw ?? 
						(datetype === "DateAndTime.DateOnly" ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm");

		//todo visible,enabled, masked
		let behavior = context.parameters.datetwooptionfield.attributes?.Behavior
		
		// * DateTime Field Behavior options
		//  * 0 - None - Unknown DateTime Behavior,
		//  * 1 - UserLocal - Respect user local time. Dates stored as UTC,
		//  * 3 - TimeZoneIndependent - Dates and time stored without conversion to UTC 

		if(context.parameters.datetwooptionfield.raw !== null){
			
			let dateraw = context.parameters.datetwooptionfield.raw as Date;
			this._props.checkeddate = dateraw;
			this._props.offset = behavior === 1 ? 0 :context.userSettings.getTimeZoneOffsetMinutes(dateraw);

		}else{
			this._props.checkeddate = undefined;
			
		}
		//format different depending on behavior
		
		this._props.format = dateformat;
		this._props.readonly = isReadOnly;
		this._props.masked = isMasked;
		this._props.showdate = context.parameters.showdate.raw === "true";
		this._props.lockafterchecked = context.parameters.lockafterchecked.raw === "true";
		this._props.showdatetext = context.parameters.showdatetext.raw ?? "";

		
		// RENDER React Component
		this._root.render(createElement(DateTwoOptionControl, this._props)) 

		
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		
		return {
			datetwooptionfield:this._checkeddate === undefined ? 
										undefined : 
										this._checkeddate
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		this._root.unmount();
	}

	private notifyChange(checkedOn:Date|undefined)
	{
		this._checkeddate = checkedOn;
		this._notifyOutputChanged();
	}

	
}