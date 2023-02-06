import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button";
import Spinner from "../spinner";

import "./item-details.css";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Record };

class ItemDetails extends Component {
  swapiService = new SwapiService();
  state = {
    item: null,
    loading: null,
    image: null,
    children: this.props.children,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl
    ) {
      this.setState({ loading: true });
      this.updateItem();
    }
  }
  extractId = (id) => {
    const idRegExp = /\/([0-9]*)$/;
    const arr = id.match(idRegExp) || [];
    return arr[1];
  };

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId).then((item) => {
      this.setState({
        item,
        loading: false,
        image: getImageUrl(item),
      });
    });
  }
  render() {
    const { item, loading } = this.state;
    const hasData = !loading && item;
    const showMSG = !item && !loading;

    const infoMesseg = showMSG ? <MessageViev /> : null;
    const itemDetails = hasData ? <DetailsView state={this.state} /> : null;
    const spinner = loading ? <Spinner /> : null;
    return (
      <div className="item-details card">
        {infoMesseg}
        {itemDetails}
        {spinner}
      </div>
    );
  }
}

const DetailsView = ({ state }) => {
  const { item, image, children } = state;

  const { name } = item;
  return (
    <React.Fragment>
      <img className="item-image" src={image} alt="Error icon" />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { item });
          })}
        </ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  );
};

const MessageViev = () => {
  return <span>Select a item from a list</span>;
};

export default ItemDetails;
