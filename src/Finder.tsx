import React, { ChangeEvent } from "react";
import "./Finder.css";
import data from "./data";

class Finder extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: "41047029S" };
    }

    handleChange(evt: ChangeEvent<HTMLInputElement>) {
        this.setState({ value: evt.target.value });
    }

    getInfo() {
        const id = this.state.value.replace(/[^\d\w]/g, "").toUpperCase() as string;
        if (!id.match(/^\d{8}[a-zA-Z]$/)) return;
        // @ts-ignore
        const sys = data["學制"][id.substr(0, 1)] || "未知";
        const year = "1" + id.substr(1, 2) + " 年";
        // @ts-ignore
        const dept = data["系所"][id.substr(3, 2)] || "未知";
        const cls = id.substr(5, 1) === "0" ? "無分班" : id.substr(5, 1) + " 班";
        const num = id.substr(6, 2) + " 號";
        // @ts-ignore
        const col = data["學院"][id.substr(8, 1)] || "未知";

        return { sys, year, dept, cls, num, col };
    }

    render() {
        return (
            <div className="Finder">
                <h3>學號</h3>
                <input id="id" onChange={this.handleChange} defaultValue={this.state.value} />
                <h3>資料</h3>
                <div className="info">
                    {this.getInfo() ? (
                        <>
                            <div>學制：{(this.getInfo() as { sys: string }).sys}</div>
                            <div>入學：{(this.getInfo() as { year: string }).year}</div>
                            <div>系所：{(this.getInfo() as { dept: string }).dept}</div>
                            <div>班級：{(this.getInfo() as { cls: string }).cls}</div>
                            <div>座號：{(this.getInfo() as { num: string }).num}</div>
                            <div>學院：{(this.getInfo() as { col: string }).col}</div>
                        </>
                    ) : (
                        <div>無資料</div>
                    )}
                </div>
            </div>
        );
    }
}

export default Finder;
