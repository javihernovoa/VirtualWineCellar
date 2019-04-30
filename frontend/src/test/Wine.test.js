import React from 'react';
import { shallow } from 'enzyme';
import Wine from '../components/wine';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { wrap } from 'module';

configure({ adapter: new Adapter() });

describe('<Wine />', () => {
    
    it('renders Edit button', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
      const wrapper = shallow(<Wine 
        {...wine}
        key={wine[0]}
        send={false}
        share={false} 
        slideshow={false}
        id={1}
        edit={true} 
        master={mockCall} 
        shared={mockCall}/>
      );
      expect(wrapper.find('.add_button').length).toBe(1);
    });

    it('testing Edit button', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={false}
            share={false} 
            slideshow={false}
            id={1}
            edit={true} 
            master={mockCall} 
            shared={mockCall}/>
        );
        wrapper.find('.add_button').simulate('click');

        expect(wrapper.state('edit')).toBe(true);
    });

    it('renders Edit form inputs', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={false}
            share={false} 
            slideshow={false}
            id={1}
            edit={true} 
            master={mockCall} 
            shared={mockCall}/>
        );
        wrapper.setState({edit: true});
        expect(wrapper.find('.form_input').length).toBe(5);
    });

    it('simulate values in Edit form inputs', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={false}
            share={false} 
            slideshow={false}
            id={1}
            edit={true} 
            master={mockCall} 
            shared={mockCall}/>
        );
        wrapper.setState({edit: true});
        
        wrapper.find('input').at(0).simulate('change', {target: {value: 'Wine'}});
        wrapper.find('input').at(1).simulate('change', {target: {value: '2011'}});
        wrapper.find('input').at(2).simulate('change', {target: {value: 'PR'}});
        wrapper.find('input').at(3).simulate('change', {target: {value: 'Grape'}});
        wrapper.find('input').at(4).simulate('change', {target: {value: '10'}});

        expect(wrapper.state('name')).toBe('Wine');
        expect(wrapper.state('year')).toBe('2011');
        expect(wrapper.state('country')).toBe('PR');
        expect(wrapper.state('grape')).toBe('Grape');
        expect(wrapper.state('alcohol')).toBe('10');
    });

    it('testing Done button', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={false}
            share={false} 
            slideshow={false}
            id={1}
            edit={true} 
            master={mockCall} 
            shared={mockCall}/>
        );
        wrapper.setState({edit: true});
        wrapper.find('.add_button').simulate('click');

        expect(wrapper.state('edit')).toBe(false);
    });

    it('render Send to me button', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={true}
            share={false} 
            slideshow={false}
            id={2}
            edit={false} 
            master={mockCall} 
            shared={mockCall}/>
        );
        expect(wrapper.find('.add_button').length).toBe(1);
    });

    it('testing Send to me button', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={true}
            share={false} 
            slideshow={false}
            id={2}
            edit={false} 
            master={mockCall} 
            shared={mockCall}/>
        );
        wrapper.find('.add_button').simulate('click');

        expect(wrapper.state('test')).toBe(true);
    });

    it('render Shared buttons', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={false}
            share={true} 
            slideshow={false}
            id={2}
            edit={false} 
            master={mockCall} 
            shared={mockCall}/>
        );
        expect(wrapper.find('.add_button').length).toBe(2);
    });

    it('testing Remove button', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={false}
            share={true} 
            slideshow={false}
            id={2}
            edit={false} 
            master={mockCall} 
            shared={mockCall}/>
        );
        wrapper.find('.add_button').at(0).simulate('click');

        expect(wrapper.state('test')).toBe(true);
    });

    it('testing Add button', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={false}
            share={true} 
            slideshow={false}
            id={2}
            edit={false} 
            master={mockCall} 
            shared={mockCall}/>
        );
        wrapper.find('.add_button').at(0).simulate('click');

        expect(wrapper.state('test')).toBe(true);
    });

    it('renders Share button', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={false}
            share={false} 
            slideshow={true}
            id={2}
            edit={false} 
            master={mockCall} 
            shared={mockCall}/>
        );
        expect(wrapper.find('.add_button').length).toBe(1);
    });

    it('renders Share userbox form input', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={false}
            share={false} 
            slideshow={true}
            id={1}
            edit={false} 
            master={mockCall} 
            shared={mockCall}/>
        );
        wrapper.setState({userbox: true});
        expect(wrapper.find('.form_input_friend').length).toBe(1);
    });

    it('testing Share button', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={false}
            share={false} 
            slideshow={true}
            id={2}
            edit={false} 
            master={mockCall} 
            shared={mockCall}/>
        );
        wrapper.setState({userbox: false});
        wrapper.find('.add_button').simulate('click');

        expect(wrapper.state('userbox')).toBe(true);
    });

    it('testing Userbox form', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={false}
            share={false} 
            slideshow={true}
            id={2}
            edit={false} 
            master={mockCall} 
            shared={mockCall}/>
        );
        wrapper.setState({userbox: true});
        wrapper.find('input').at(0).simulate('change', {target: {value: 'Test'}});

        expect(wrapper.state('friend_username')).toBe('Test');
    });

    it('renders Share button', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={false}
            share={false} 
            slideshow={true}
            id={2}
            edit={false} 
            master={mockCall} 
            shared={mockCall}/>
        );
        wrapper.setState({userbox: true});
        expect(wrapper.find('.add_button').length).toBe(2);
    });

    it('testing Send! button', () => {
        const mockCall = jest.fn();
        const wine = [
            1,
            "Undurraga",
            2016,
            "Argentina",
            "Cabernet",
            13,
            "undurraga.jpg"
        ]
        const wrapper = shallow(<Wine 
            {...wine}
            key={wine[0]}
            send={false}
            share={false} 
            slideshow={true}
            id={2}
            edit={false} 
            master={mockCall} 
            shared={mockCall}/>
        );
        wrapper.setState({userbox: true});
        wrapper.find('.add_button').at(1).simulate('click');

        expect(wrapper.state('test')).toBe(true);
    });
  });