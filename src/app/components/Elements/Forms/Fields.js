import React from "react";
import { Form, Col } from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import { Formik, Field } from 'formik';

/** Type Ahead */
export function FormTypeAhead ({index, fieldObj, values, handleChange, handleBlur, touched, isValid, errors}) {
    const multiple = true;
    return (<Form.Group key={index} as={Col} id={"formGridTypeahead" + fieldObj.handle} className="mb-3">
            <Form.Label>{fieldObj.label}</Form.Label>
            <Field>
                {({ field, form }) => (
                    <Typeahead
                        id={fieldObj.handle}
                        value={field.value}
                        multiple={multiple}
                        options={fieldObj.data}
                        onChange={(selected) => {
                            form.setFieldValue(fieldObj.handle, selected);
                        }}
                        placeholder={fieldObj.placeholder}
                        isValid={touched[fieldObj.handle] && !errors[fieldObj.handle]}
                        isInvalid={!!errors[fieldObj.handle]}
                        className={errors[fieldObj.handle] && touched[fieldObj.handle] ? 'text-input error' : 'text-input'}/>
                )}
            </Field>
            {errors[fieldObj.handle] && touched[fieldObj.handle] && (<Form.Control.Feedback type="invalid">{errors[fieldObj.handle]}</Form.Control.Feedback>)}
            </Form.Group>)
}

/** Radio Button */
export function FormRadio ({index, fieldObj, values, handleChange, handleBlur, touched, isValid, errors}) {
    return (<Form.Group 
            key={index} 
            onChange={handleChange}
            onBlur={handleBlur}
            as={Col} 
            id={"formGridRadio" + fieldObj.handle} className="mb-3">
        <Form.Label>{fieldObj.label}</Form.Label>
        {fieldObj.data.length > 0 && fieldObj.data.map((o, i) => (<Form.Check
            key={i}
            type="radio"
            label={o.label}
            value={o.value}
            name={fieldObj.handle}
            isValid={touched[fieldObj.handle] && !errors[fieldObj.handle]}
            isInvalid={!!errors[fieldObj.handle]}
            className={errors[fieldObj.handle] && touched[fieldObj.handle] ? 'text-input error' : 'text-input'}
            inline={fieldObj.inline}
            />))}
        </Form.Group>)
}

/** Checkbox */
export function FormCheckbox ({index, fieldObj, values, handleChange, handleBlur, touched, isValid, errors}) {
    return (<Form.Group key={index} as={Col} id="formGridCheckbox" className="mb-3">
            <Form.Check 
                inline
                name={fieldObj.handle}
                type="checkbox" 
                label={fieldObj.label} 
                value={values[fieldObj.handle]}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched[fieldObj.handle] && !errors[fieldObj.handle]}
                isInvalid={!!errors[fieldObj.handle]}
                className={errors[fieldObj.handle] && touched[fieldObj.handle] ? 'text-input error' : 'text-input'}
                inline={fieldObj.inline}
                />
                {errors[fieldObj.handle] && touched[fieldObj.handle] && (<Form.Control.Feedback type="invalid">{errors[fieldObj.handle]}</Form.Control.Feedback>)}
        </Form.Group>)
}

/** Select */
export function FormSelect ({index, fieldObj, values, handleChange, handleBlur, touched, isValid, errors}) {
    return (<Form.Group key={index} as={Col} controlId={fieldObj.handle} key={index} className="mb-3">
        <Form.Label>{fieldObj.label}</Form.Label>
        <Form.Control as="select"
            name={fieldObj.handle}
            placeholder={fieldObj.placeholder}
            value={values[fieldObj.handle]}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched[fieldObj.handle] && !errors[fieldObj.handle]}
            isInvalid={!!errors[fieldObj.handle]}
            className={errors[fieldObj.handle] && touched[fieldObj.handle] ? 'text-input error' : 'text-input'}
            >
            <option value="">{fieldObj.placeholder}</option>
            {fieldObj.data.length > 0 && fieldObj.data.map((o, i) => (<option value={o.value} key={i}>{o.label}</option>))}
        </Form.Control>
        {errors[fieldObj.handle] && touched[fieldObj.handle] && (<Form.Control.Feedback type="invalid">{errors[fieldObj.handle]}</Form.Control.Feedback>)}
    </Form.Group>)
}

/** Textarea */
export function FormTextarea ({index, fieldObj, values, handleChange, handleBlur, touched, isValid, errors}) {
    return (<Form.Group key={index} as={Col} controlId={fieldObj.handle} key={index} className="mb-3">
        <Form.Label>{fieldObj.label}</Form.Label>
        <Form.Control 
            as="textarea"
            rows={fieldObj.rows || 5}
            name={fieldObj.handle}
            placeholder={fieldObj.placeholder}
            value={values[fieldObj.handle]}
            onChange={handleChange}
            isValid={touched[fieldObj.handle] && !errors[fieldObj.handle]}
            isInvalid={!!errors[fieldObj.handle]}
            className={errors[fieldObj.handle] && touched[fieldObj.handle] ? 'text-input error' : 'text-input'} />

            {errors[fieldObj.handle] && touched[fieldObj.handle] && (<Form.Control.Feedback type="invalid">{errors[fieldObj.handle]}</Form.Control.Feedback>)}
        </Form.Group>)
}

export function FormDefault ({index, fieldObj, values, handleChange, handleBlur, touched, isValid, errors}) {
    return (<Form.Group key={index} as={Col} lg={fieldObj?.col?.lg} md={fieldObj?.col?.md} sm={fieldObj?.col?.sm} controlId={fieldObj.handle} key={index} className="mb-3">
        <Form.Label>{fieldObj.label}</Form.Label>
        <Form.Control 
            type={fieldObj.type}
            name={fieldObj.handle}
            placeholder={fieldObj.placeholder}
            value={values[fieldObj.handle]}
            onChange={handleChange}
            isValid={touched[fieldObj.handle] && !errors[fieldObj.handle]}
            isInvalid={!!errors[fieldObj.handle]}
            className={errors[fieldObj.handle] && touched[fieldObj.handle] ? 'text-input error' : 'text-input'} />
            {errors[fieldObj.handle] && touched[fieldObj.handle] && (<Form.Control.Feedback type="invalid">{errors[fieldObj.handle]}</Form.Control.Feedback>)}
            </Form.Group>)
}

/** Hidden */
export function FormHidden ({index, fieldObj, values, handleChange, handleBlur, touched, isValid, errors}) {
    return (<Form.Control 
            type="hidden"
            name={fieldObj.handle}
            placeholder={fieldObj.placeholder}
            value={values[fieldObj.handle]}
            onChange={handleChange}
            isValid={touched[fieldObj.handle] && !errors[fieldObj.handle]}
            isInvalid={!!errors[fieldObj.handle]}
            className={errors[fieldObj.handle] && touched[fieldObj.handle] ? 'text-input error' : 'text-input'} />)
}