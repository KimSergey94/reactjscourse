import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { Dropdown } from ".."


configure({ adapter: new Adapter() })

describe('Dropdown', () => {
    test('should render', ()=> {
        const wrapper = shallow(<Dropdown children={<div></div>} button={<button />} />);
        expect(wrapper).toBeDefined();
        expect(wrapper.find('div.container').isEmptyRender()).toBeFalsy();
    });

    test('should render (snapshot)', ()=> {
        const wrapper = shallow(<Dropdown children={<div />} button={<button />} />);
        expect(wrapper).toMatchSnapshot();

        
    });
});
