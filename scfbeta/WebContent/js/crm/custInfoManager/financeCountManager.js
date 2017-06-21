$(document).ready(function() {
	loadCount();
});

let loadCount = function() {
	$('#negativeForm input').bind('input propertychange', function() {
		addTotalCurrentAssets();
		addTotalNonCurrentAssets();
		addTotalCurrentLiabilities();
		addTotalNonCurrentLiabilities();
		addtTotalOwnersEquity();
		ajaxTotalAssetsGrowth();
	});
	$('#profitForm input').bind('input propertychange', function() {
		addProfit();
	});
	$('#cashflowForm input').bind('input propertychange', function() {
		addCashflow();
	});
}

//平均流动资产	 流动资产合计 
let addTotalCurrentAssets = function() {
	let arr = ("moneyFunds,otherMoneyFunds,transactionalFinancialAssets,billReceivable,accountsReceivable,prepayments," +
			"interestReceivable,dividendReceivable,otherReceivables,stock,nonCurrentAssetsDueWithinOneYear,otherCurrentAssets").split(","); 
	let paramArr = [];
	for(let i in arr) {
		$("#"+arr[i]).val() == "" ? paramArr.push(0) : paramArr.push($("#"+arr[i]).val());
	}
	let total = CloudUtils.MathArray(paramArr.join(), "add,add,add,add,add,add,add,add,add,add,add");
	$("#totalCurrentAssets").val(total);
	$("#averageCurrentAssets").val(total);
	
	//平均应收账款 = 应收账款+应收票据 
	let averageAccountsReceivable = CloudUtils.MathArray($("#billReceivable").val()+","+$("#accountsReceivable").val(), "add");
	$("#averageAccountsReceivable").val(averageAccountsReceivable);
	
	//平均存货	 存货 
	$("#averageInventory").val($("#stock").val());
	
	//平均预付账款	 预付款项 
	$("#averagePrepayment").val($("#prepayments").val());
	
	//平均其他应收款	 其他应收款 
	$("#averageOtherReceivables").val($("#otherReceivables").val());
	
	//平均货币资金	 货币资金 
	$("#averageMoneyFunds").val($("#moneyFunds").val());
}

//非流动资产
let addTotalNonCurrentAssets = function() {
	let arr = ("availableForSaleFinancialAssets,heldToMaturityInvestments,longTermReceivables,longTermEquityInvestment," +
			"investmentRealEstate,fixedAssets,constructionInProgress,engineerMaterial,cleanUpOfFixedAssets," +
			"productiveBiologicalAssets,oilAndGasProperties,intangibleAssets,developmentExpenditure,goodwill," +
			"longTermPrepaidExpenses,deferredTaxAssets,otherNonCurrentAssets").split(',');
	let paramArr = [];
	for(var i in arr){
		$("#"+arr[i]).val() == "" ? paramArr.push(0) : paramArr.push($("#"+arr[i]).val());
	}
	let total = CloudUtils.MathArray(paramArr.join(), "add,add,add,add,add,add,add,add,add,add,add,add,add,add,add,add");
	$("#totalNonCurrentAssets").val(total);
	
	//平均总资产	 资产总计 
	let totalAssets = CloudUtils.MathArray($("#totalNonCurrentAssets").val() +","+ $("#totalCurrentAssets").val(), "add");
	$("#totalAssets").val(totalAssets);
	$("#averageTotalAssets").val(totalAssets);
	
	//平均固定资产净值	 固定资产 
	$("#averageNetFixedAssets").val($("#fixedAssets").val());
}

//平均流动负债	 流动负债合计 
let addTotalCurrentLiabilities = function() {
	let arr = ("shortTermLoan,transactionalFinancialLiabilities,notesPayable,accountsPayable,advancePayment," +
			"employeeBenefitsPayable,taxesPayable,interestPayable,dividendPayable,otherPayables," +
			"nonCurrentLiabilitiesDueWithinOneYear,otherCurrentLiabilities").split(',');
	let paramArr = [];
	for(var i in arr){
		$("#"+arr[i]).val() == "" ? paramArr.push(0) : paramArr.push($("#"+arr[i]).val());
	}
	let total = CloudUtils.MathArray(paramArr.join(), "add,add,add,add,add,add,add,add,add,add,add");
	$("#totalCurrentLiabilities").val(total);
	$("#averageCurrentLiabilities").val(total);
	
	//平均应付账款= 应付账款  +应付票据 
	let averageAccountsPayable = CloudUtils.MathArray($("#notesPayable").val()+","+$("#accountsPayable").val(), "add");
	$("#averageAccountsPayable").val(averageAccountsPayable);
}

//非流动负债
let addTotalNonCurrentLiabilities = function() {
	let arr = ("longTermLoan,bondsPayable,longTermPayables,specialPayables,projectedLiabilities," +
			"deferredIncomeTaxLiabilities,otherNonCurrentLiabilities").split(',');
	let paramArr = [];
	for(var i in arr){
		$("#"+arr[i]).val() == "" ? paramArr.push(0) : paramArr.push($("#"+arr[i]).val());
	}
	let total = CloudUtils.MathArray(paramArr.join(), "add,add,add,add,add,add");
	$("#totalNonCurrentLiabilities").val(total);
	
	//平均总负债	 负债合计 
	let totalLiabilities = CloudUtils.MathArray($("#totalCurrentLiabilities").val() +","+ $("#totalNonCurrentLiabilities").val(), "add");
	$("#totalLiabilities").val(totalLiabilities);
	$("#averageTotalLiabilities").val(totalLiabilities);
}

//平均净资产	 所有者权益（或股东权益）合计 
let addtTotalOwnersEquity = function() {
	let arr = "paidUpCapital,capitalReserve,treasuryStocks,surplusReserve,undistributedProfit".split(",");
	let paramArr = [];
	for(var i in arr){
		$("#"+arr[i]).val() == "" ? paramArr.push(0) : paramArr.push($("#"+arr[i]).val());
	}
	let total = CloudUtils.MathArray(paramArr.join(),"add,add,add,add");
	$("#totalOwnersEquity").val(total);
	$("#averageNetAssets").val(total);
	
	//负债和所有者权益（或股东权益）总计 
	let totalLiabilitiesAndOwnersEquity = CloudUtils.MathArray($("#totalLiabilities").val() +","+ $("#totalOwnersEquity").val(), "add");
	$("#totalLiabilitiesAndOwnersEquity").val(totalLiabilitiesAndOwnersEquity);
}

// 总资产增长
let ajaxTotalAssetsGrowth = function() {
	var totalLiabilitiesAndOwnersEquity = $("#totalLiabilitiesAndOwnersEquity").val();
	var totalOwnersEquity = $("#totalOwnersEquity").val();
	var surplusReserve = $("#surplusReserve").val();
	var totalLiabilitiesAndOwnersEquityPre = 0;
	var totalOwnersEquityPre = 0;
	var surplusReservePre = 0;
	var earningsPerShare = 0;
	var corpId =  $("#corpId").val();
	var nowYear = $("#operYear").val();
	var preYear = CloudUtils.MathArray(nowYear +",1", "sub");
	var data = '{"operYear":"'+preYear+'","corpId":"'+corpId+'"}';
	var options = {
			url : "../../negative/getPara",
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					if(data!=null&&data.totalLiabilitiesAndOwnersEquity!=undefined){
						totalLiabilitiesAndOwnersEquityPre = data.totalLiabilitiesAndOwnersEquity;
					}
					if(data!=null&&data.totalOwnersEquity!=undefined){
						totalOwnersEquityPre = data.totalOwnersEquity;
					}
					if(data!=null&&data.surplusReserve!=undefined){
						surplusReservePre = data.surplusReserve;
					}
					if(data!=null&&data.earningsPerShare!=undefined){
						earningsPerShare = data.earningsPerShare;
					}
				}else{
					bootbox.alert(data.resultNote);
				}
			},
			errorCallback:function(data){
				bootbox.alert(data.resultNote);
				return false;
			}
	};
	CloudUtils.ajax(options);
	
	//总资产增长额= 期末负债和所有者权益（或股东权益）总计-期初负债和所有者权益（或股东权益）总计
	var totalAssetsGrowthParaStr = totalLiabilitiesAndOwnersEquity +","+ totalLiabilitiesAndOwnersEquityPre;
	var totalAssetsGrowth = CloudUtils.MathArray(totalAssetsGrowthParaStr,"sub");
	$("#totalAssetsGrowth").val(totalAssetsGrowth);
	
	//总资产增长率= 总资产增长额/负债和所有者权益（或股东权益）总计 
	var totalAstStr = $("#totalAssetsGrowth").val() +","+ $("#totalLiabilitiesAndOwnersEquity").val();
	var totalAssetsGrowthRate =  CloudUtils.transform(CloudUtils.MathArray(totalAstStr,"div"))==true?0:CloudUtils.MathArray(totalAstStr,"div");
	$("#totalAssetsGrowthRate").val(CloudUtils.Math(totalAssetsGrowthRate,100,'mul'));
	//未分配利润试算表= 未分配利润+利润表中的每股收益 
	var unalStr =  $("#undistributedProfit").val()+","+ earningsPerShare;
	var unallocatedProfitSpreadsheet = CloudUtils.MathArray(unalStr,"add");
	$("#unallocatedProfitSpreadsheet").val(unallocatedProfitSpreadsheet);
	//未分配利润平衡差额= 未分配利润试算表-未分配利润 
	var balaStr = unallocatedProfitSpreadsheet +","+ $("#undistributedProfit").val();
	var balanceOfUndistributedProfit = CloudUtils.MathArray(balaStr,"sub");
	$("#balanceOfUndistributedProfit").val(balanceOfUndistributedProfit);
	//盈余资金增加额increaseInSurplusFunds=盈余公积surplusReserve期末 - surplusReserve期初
	var increaseInSurplusFundsStr = surplusReserve +","+ surplusReservePre;
	var increaseInSurplusFunds = CloudUtils.MathArray(increaseInSurplusFundsStr,"sub");
	$("#increaseInSurplusFunds").val(increaseInSurplusFunds);
	//净资产增长额increaseInNetAssets=所有者权益（或股东权益）合计totalOwnersEquity期末-totalOwnersEquity期初
	var increaseInNetAssetsStr = totalOwnersEquity +","+ totalOwnersEquityPre;
	var increaseInNetAssets = CloudUtils.MathArray(increaseInNetAssetsStr,"sub");
	$("#increaseInNetAssets").val(increaseInNetAssets);
	//净资产增长率= 净资产增长额/所有者权益（或股东权益）合计
	var netAssetsGrowthRateStr = increaseInNetAssets +","+ totalOwnersEquity;
	var netAssetsGrowthRate = CloudUtils.transform(CloudUtils.MathArray(netAssetsGrowthRateStr,"div"))==true?0:CloudUtils.MathArray(netAssetsGrowthRateStr,"div");
	$("#netAssetsGrowthRate").val(CloudUtils.Math(netAssetsGrowthRate,100,'mul'));
}

// 利润计算
let addProfit = function() {
	let operatingGain = $("#operatingGain").val();
	let operatingCost = $("#operatingCost").val();
	let salesExpense = $("#salesExpense").val();
	let managementExpense = $("#managementExpense").val();
	let financialExpense = $("#financialExpense").val();
	let changesInFairValueGain = $("#changesInFairValueGain").val();
	let impairmentLosses = $("#impairmentLosses").val();
	let investmentGain = $("#investmentGain").val();
	let taxAndSurcharges = $("#taxAndSurcharges").val();
	let nonOperatingGain = $("#nonOperatingGain").val();
	let nonOperatingExpense = $("#nonOperatingExpense").val();
	let incomeTaxExpense = $("#incomeTaxExpense").val();
	
	//毛利率=(营业收入-营业成本)/营业收入
	let grossProfitRate = CloudUtils.transform(CloudUtils.Math(CloudUtils.Math(operatingGain, operatingCost, 'sub'), operatingGain, 'div'));
	$("#grossProfitRate").val(CloudUtils.Math(grossProfitRate, 100, 'mul'));
	
	//费用率=(销售费用+管理费用+财务费用)/营业收入
	let expenseRate = CloudUtils.transform(CloudUtils.Math(CloudUtils.Math(CloudUtils.Math(salesExpense, financialExpense,'add'), managementExpense, 'add'), operatingGain, 'div'));
	$("#expenseRate").val(CloudUtils.Math(expenseRate, 100, 'mul'));
	
	//营业利润 = 营业收入-营业成本-营业税金及附加-销售费用-管理费用-财务费用+公允价值变动收益-资产减值损失+投资收益
	let operatingProfitstr = operatingGain + ","+operatingCost+","+taxAndSurcharges+","+salesExpense+","+managementExpense+","+financialExpense+","+changesInFairValueGain+","+impairmentLosses+","+investmentGain;
	let operatingProfit = CloudUtils.transform(CloudUtils.MathArray(operatingProfitstr, "sub,sub,sub,sub,sub,add,sub,add"));
	$("#operatingProfit").val(operatingProfit);
	
	//利润总额 = 营业利润+营业外收入-营业外支出
	let totalProfit = CloudUtils.transform(CloudUtils.Math(CloudUtils.Math(operatingProfit, nonOperatingGain, 'add'), nonOperatingExpense, 'sub'));
	$("#totalProfit").val(totalProfit);
	
	//净利润 = 利润总额-所得税费用
	let netProfit = CloudUtils.transform(CloudUtils.Math(totalProfit, incomeTaxExpense, 'sub'));
	$("#netProfit").val(netProfit);
	
	//净利润率 = 净利润/营业收入
	let netProfitRate = CloudUtils.transform(CloudUtils.Math(netProfit, operatingGain, 'div'));
	$("#netProfitRate").val(CloudUtils.Math(netProfitRate, 100, 'mul'));
	
	//成本费用总额 = 营业成本+ 营业税金及附加+ 销售费用+管理费用+ 财务费用+资产减值损失 
	let totalCoststr = operatingCost+","+taxAndSurcharges+","+salesExpense+","+managementExpense+","+financialExpense+","+impairmentLosses;
	let totalCost = CloudUtils.transform(CloudUtils.MathArray(totalCoststr, "add,add,add,add,add"));
	$("#totalCost").val(totalCost);
	
	//成本费用率 = 成本费用总额/营业收入
	let costExpenseRate = CloudUtils.transform(CloudUtils.Math(totalCost, operatingGain, 'div'));
	$("#costExpenseRate").val(CloudUtils.Math(costExpenseRate, 100, 'mul'));
	
	//计税基数（即应付增值税）= 营业税金及附加/0.04 taxAndSurcharges
	let taxBase = CloudUtils.transform(CloudUtils.Math(taxAndSurcharges, "0.04", 'div'));
	$("#taxBase").val(taxBase);
	
	//付税率 = 计税基数（即应付增值税）/营业收入
	let taxRate = CloudUtils.transform(CloudUtils.Math(taxBase, operatingGain, 'div'));
	$("#taxRate").val(CloudUtils.Math(taxRate, 100, 'mul'));
	
	//主营业务成本率 = 	营业成本/营业收入
	let mainCostRate = CloudUtils.transform(CloudUtils.Math(operatingCost, operatingGain, 'div'));
	$("#mainCostRate").val(CloudUtils.Math(mainCostRate, 100, 'mul'));
	
	//期间费用率 = 成本费用率-主营业务成本率
	let periodExpenseRate = CloudUtils.transform(CloudUtils.Math(costExpenseRate, mainCostRate, 'sub'));
	$("#periodExpenseRate").val(CloudUtils.Math(periodExpenseRate, 100, 'mul'));
}

// 现金计算
let addCashflow = function() {
	//经营活动现金流入小计
	let incomeFromSellingAndOffering = $("#incomeFromSellingAndOffering").val();//销售商品、提供劳务收到的现金
	let taxBeReturned = $("#taxBeReturned").val();//收到的税费返还
	let otherCapitalAboutTheActivity = $("#otherCapitalAboutTheActivity").val();//收到其他与经营活动有关的资金
	
	//经营活动现金流出小计
	let expendOfSellCommodity = $("#expendOfSellCommodity").val();//购买商品、接受劳务支付的现金
	let expendOfPayToStaffs = $("#expendOfPayToStaffs").val();//支付给职工以及为职工支付的现金
	let paymentsOfTaxes = $("#paymentsOfTaxes").val();//支付的各项税费
	let therExpendOfActivity = $("#therExpendOfActivity").val();//支付其他与经营活动有关的现金
	
	//投资活动现金流入小计
	let incomeFromWithdrawInvestment = $("#incomeFromWithdrawInvestment").val();//收回投资收到的现金
	let otherCashReceivedInvestActivity = $("#otherCashReceivedInvestActivity").val();//收到其他与投资活动有关的现金
	let cashOfFixedIntangibleOtherLong = $("#cashOfFixedIntangibleOtherLong").val();//处置固定资产、无形资产和其他长期资产收回的现金净额
	let cashFromDisposalOtherBusiness = $("#cashFromDisposalOtherBusiness").val();//处置子公司及其他营业单位收到的现金净额
	let cashFromInvestIncome = $("#cashFromInvestIncome").val();//取得投资收益收到的现金
	
	//投资活动现金流出小计
	let cashOfFixedIntangibleLong = $("#cashOfFixedIntangibleLong").val();//购建固定资产、无形资产和其他长期资产支付的现金
	let expenditureOfInvest = $("#expenditureOfInvest").val();//投资支付的现金
	let cashPaidForBusinessSubsidiaries = $("#cashPaidForBusinessSubsidiaries").val();//取得子公司及其他营业单位支付的现金净额
	let expendOfActivityAboutInvestment = $("#expendOfActivityAboutInvestment").val();//支付其他与投资活动有关的现金
	
	//筹资活动现金流入小计
	let incomeFromAbsorbInvestment = $("#incomeFromAbsorbInvestment").val();//吸收投资收到的现金
	let incomeFromObtainBorrowMoney = $("#incomeFromObtainBorrowMoney").val();//取得借款收到的现金
	let otherIncomeFromRaiseMoney = $("#otherIncomeFromRaiseMoney").val();//收到其他与筹资活动有关的现金
	
	//筹资活动现金流出小计
	let expendOfRepaymentOfDept = $("#expendOfRepaymentOfDept").val();//偿还债务支付的现金
	let cashOfDividendsProfitInterest = $("#cashOfDividendsProfitInterest").val();//分配股利、利润或偿付利息支付的现金
	let otherExpendActivityRaiseMoney = $("#otherExpendActivityRaiseMoney").val();//支付其他与筹资活动有关的现金
	
	//其他经营活动产生的现金流量净额
	let margin = $("#margin").val();//净利润
	let preparationOfDevaluation = $("#preparationOfDevaluation").val();//资产减值准备
	let depreciationOfFixed = $("#depreciationOfFixed").val();//固定资产折旧、油气资产折耗、生产性生物资产折旧
	let amortizationOfIntangible = $("#amortizationOfIntangible").val();//无形资产摊销
	let amortizationOfLong = $("#amortizationOfLong").val();//长期待摊费用摊销
	let lossFromDisposal = $("#lossFromDisposal").val();//处置固定资产、无形资产和其他长期资产的损失
	let lossOfFixed = $("#lossOfFixed").val();//固定资产报废损失
	let changeInFairValueLoss = $("#changeInFairValueLoss").val();//公允价值变动损失
	let financialExpenses = $("#financialExpenses").val();//财务费用
	let investmentLoss = $("#investmentLoss").val();//投资损失
	let decreaseInDeferredTax = $("#decreaseInDeferredTax").val();//递延所得税资产减少
	let increaseInDeferredTaxLiabilities = $("#increaseInDeferredTaxLiabilities").val();//递延所得税负债增加
	let decreaseInInventories = $("#decreaseInInventories").val();//存货的减少
	let decreaseInOperatingReceivables = $("#decreaseInOperatingReceivables").val();//经营性应收项目的减少
	let increaseInOperatingPayables = $("#increaseInOperatingPayables").val();//经营性应付项目的增加
	let other = $("#other").val();//其他

	//现金及现金等价物净增加额
	let closeBalanceOfCash = $("#closeBalanceOfCash").val();//现金的期末余额
	let openBalanceOfCash = $("#openBalanceOfCash").val();//现金的期初余额

	/*******************************************计算规则******************************************/
	
	//经营活动现金流入小计=SUM(销售商品,提供劳务收到的现金,收到其他与经营活动有关的资金)
	let incomeSubtotalOfOperatActivityStr = incomeFromSellingAndOffering+","+taxBeReturned+","+otherCapitalAboutTheActivity;
	let incomeSubtotalOfOperatActivity = CloudUtils.transform(CloudUtils.MathArray(incomeSubtotalOfOperatActivityStr, "add,add"));
	$("#incomeSubtotalOfOperatActivity").val(incomeSubtotalOfOperatActivity);
	
	//经营活动现金流出小计=购买商品、接受劳务支付的现金+支付给职工以及为职工支付的现金+支付的各项税费+支付其他与经营活动有关的现金
	let outcomeSubtotalOfOperatActivityStr = expendOfSellCommodity+","+expendOfPayToStaffs+","+paymentsOfTaxes+","+therExpendOfActivity;
	let outcomeSubtotalOfOperatActivity = CloudUtils.transform(CloudUtils.MathArray(outcomeSubtotalOfOperatActivityStr, "add,add,add"));
	$("#outcomeSubtotalOfOperatActivity").val(outcomeSubtotalOfOperatActivity);
	
	//经营活动产生的现金流量净额=经营活动现金流入小计-经营活动现金流出小计
	let netAmountOfCashFlow = CloudUtils.transform(CloudUtils.Math(incomeSubtotalOfOperatActivity, outcomeSubtotalOfOperatActivity, "sub"));
	$("#netAmountOfCashFlow").val(netAmountOfCashFlow);
	
	//投资活动现金流入小计=SUM(收回投资收到的现金:收到其他与投资活动有关的现金)
	let incomeSubtotalOfInvestmentActivitiesStr = incomeFromWithdrawInvestment+","+otherCashReceivedInvestActivity+","+cashOfFixedIntangibleOtherLong+","+cashFromDisposalOtherBusiness+","+cashFromInvestIncome;
	let incomeSubtotalOfInvestmentActivities = CloudUtils.transform(CloudUtils.MathArray(incomeSubtotalOfInvestmentActivitiesStr, "add,add,add,add"));
	 $("#incomeSubtotalOfInvestmentActivities").val(incomeSubtotalOfInvestmentActivities);
	
	//投资活动现金流出小计=SUM(购建固定资产、无形资产和其他长期资产支付的现金:支付其他与投资活动有关的现金)
	let outcomeSubtotalOfInvestmentActivitiesStr = cashOfFixedIntangibleLong+","+expenditureOfInvest+","+cashPaidForBusinessSubsidiaries+","+expendOfActivityAboutInvestment;
	let outcomeSubtotalOfInvestmentActivities = CloudUtils.transform(CloudUtils.MathArray(outcomeSubtotalOfInvestmentActivitiesStr, "add,add,add"));
	$("#outcomeSubtotalOfInvestmentActivities").val(outcomeSubtotalOfInvestmentActivities);
	
	//投资活动产生的现金流量净额=投资活动现金流入小计-投资活动现金流出小计
	let investmentAmountOfCashFlow = CloudUtils.transform(CloudUtils.Math(incomeSubtotalOfInvestmentActivities,outcomeSubtotalOfInvestmentActivities, "sub"));
	$("#investmentAmountOfCashFlow").val(investmentAmountOfCashFlow);
	
	//筹资活动现金流入小计=SUM(吸收投资收到的现金:收到其他与筹资活动有关的现金)
	let incomeSubtotalOfFinanceActivitiesStr = incomeFromAbsorbInvestment+","+incomeFromObtainBorrowMoney+","+otherIncomeFromRaiseMoney;
	let incomeSubtotalOfFinanceActivities = CloudUtils.transform(CloudUtils.MathArray(incomeSubtotalOfFinanceActivitiesStr, "add,add"));
	$("#incomeSubtotalOfFinanceActivities").val(incomeSubtotalOfFinanceActivities);
	
	//筹资活动现金流出小计=SUM(偿还债务支付的现金:支付其他与筹资活动有关的现金)
	let outcomeSubtotalOfFinancingActivitiesStr = expendOfRepaymentOfDept+","+cashOfDividendsProfitInterest+","+otherExpendActivityRaiseMoney;
	let outcomeSubtotalOfFinancingActivities = CloudUtils.transform(CloudUtils.MathArray(outcomeSubtotalOfFinancingActivitiesStr, "add,add"));
	$("#outcomeSubtotalOfFinancingActivities").val(outcomeSubtotalOfFinancingActivities);
	
	//筹资活动产生的现金流量净额=筹资活动现金流入小计-筹资活动现金流出小计
	let financingAmountOfCashFlow = CloudUtils.transform(CloudUtils.Math(incomeSubtotalOfFinanceActivities,outcomeSubtotalOfFinancingActivities, "sub"));
	$("#financingAmountOfCashFlow").val(financingAmountOfCashFlow);
	
	//现金及现金等价物净增加额=经营活动产生的现金流量净额+投资活动产生的现金流量净额+筹资活动产生的现金流量净额
	let increaseCashEquivalentStr = netAmountOfCashFlow+","+investmentAmountOfCashFlow+","+financingAmountOfCashFlow;
	let increaseCashEquivalent = CloudUtils.transform(CloudUtils.MathArray(increaseCashEquivalentStr, "add,add"));
	$("#increaseCashEquivalent").val(increaseCashEquivalent);
	
	//其他经营活动产生的现金流量净额=SUM(净利润:其他)
	let otherAmountOfCashFlowStr = margin+","+preparationOfDevaluation+","+depreciationOfFixed+","+amortizationOfIntangible+","+amortizationOfLong+","+lossFromDisposal+","+lossOfFixed+","+changeInFairValueLoss+","+financialExpenses+","+investmentLoss+","+decreaseInDeferredTax+","+increaseInDeferredTaxLiabilities+","+decreaseInInventories+","+decreaseInOperatingReceivables+","+increaseInOperatingPayables+","+other;
	let otherAmountOfCashFlow = CloudUtils.transform(CloudUtils.MathArray(otherAmountOfCashFlowStr, "add,add,add,add,add,add,add,add,add,add,add,add,add,add,add"));
	$("#otherAmountOfCashFlow").val(otherAmountOfCashFlow);
	
	//现金及现金等价物净增加额=现金的期末余额-现金的期初余额
	let cashAndCashEquivalentsStr = closeBalanceOfCash+","+openBalanceOfCash;
	let cashAndCashEquivalents = CloudUtils.transform(CloudUtils.MathArray(cashAndCashEquivalentsStr, "sub"));
	$("#cashAndCashEquivalents").val(cashAndCashEquivalents);
}