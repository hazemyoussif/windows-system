import EntityCreator from "./EntityCreator";
import PortfolioContainer from "./PortfolioContainer";
const PortfoliosList = (props) => {

    const portfolios = props.portfolios.map(portfolio => {
        return <PortfolioContainer portfolioData={portfolio}/>
    });
    return (<div>
        {portfolios}
        {/* <EntityCreator type="Portfolio" parentId={props.clientId}/> */}
    </div>);
}

export default PortfoliosList;