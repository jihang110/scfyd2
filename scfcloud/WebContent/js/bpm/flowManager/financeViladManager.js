$(document).ready(function() {
	formValidator();
});

function formValidator() {
	$('#negativeForm').bootstrapValidator({
      message: 'This value is not valid',
      excluded: ':disabled',
      feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
    	    moneyFunds : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '货币资金在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			otherMoneyFunds : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '其它货币资金在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			transactionalFinancialAssets : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '交易性金融资产在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			billReceivable : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '应收票据在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			accountsReceivable : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '应收账款在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			prepayments : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '预付款项在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			interestReceivable : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '应收利息在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			dividendReceivable : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '应收股利在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			otherReceivables : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '其他应收款在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			stock : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '存货在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			nonCurrentAssetsDueWithinOneYear : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '一年内到期的非流动资产在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			otherCurrentAssets : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '其他流动资产在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			availableForSaleFinancialAssets : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '可供出售金融资产在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			heldToMaturityInvestments : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '持有至到期投资在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			longTermReceivables : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '长期应收款在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			longTermEquityInvestment : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '长期股权投资在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			investmentRealEstate : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '投资性房地产在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			fixedAssets : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '固定资产在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			constructionInProgress : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '在建工程在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			engineerMaterial : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '工程物资在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			cleanUpOfFixedAssets : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '固定资产清理在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			productiveBiologicalAssets : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '生产性生物资产在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			oilAndGasProperties : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '油气资产在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			intangibleAssets : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '无形资产在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			developmentExpenditure : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '开发支出在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			goodwill : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '商誉在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			longTermPrepaidExpenses : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '长期待摊费用在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			deferredTaxAssets : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '递延所得税资产在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			otherNonCurrentAssets : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '其他非流动资产在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			shortTermLoan : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '短期借款在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			transactionalFinancialLiabilities : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '交易性金融负债在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			notesPayable : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '应付票据在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			accountsPayable : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '应付账款在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			advancePayment : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '预收款项在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			employeeBenefitsPayable : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '应付职工薪酬在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			taxesPayable : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '应交税费在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			interestPayable : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '应付利息在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			dividendPayable : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '应付股利在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			otherPayables : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '其他应付款在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			nonCurrentLiabilitiesDueWithinOneYear : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '一年内到期的非流动负债在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			otherCurrentLiabilities : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '其他流动负债在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			longTermLoan : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '长期借款在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			bondsPayable : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '应付债券在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			longTermPayables : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '长期应付款在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			specialPayables : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '专项应付款在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			projectedLiabilities : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '预计负债在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			deferredIncomeTaxLiabilities : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '递延所得税负债在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			otherNonCurrentLiabilities : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '其他非流动负债在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			paidUpCapital : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '实收资本（或股本）在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			capitalReserve : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '资本公积在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			treasuryStocks : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '库存股在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			surplusReserve : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '盈余公积在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			undistributedProfit : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '未分配利润在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			}
		}
	})
	.on('success.form.bv', function (e) {
		e.preventDefault();
		saveFun('negative');
		$(e.target).bootstrapValidator('resetForm', true);
	});
	
	$('#profitForm').bootstrapValidator({
		message : 'This value is not valid',
		excluded : ':disabled',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			operatingGain : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '营业收入不能为空'
					},
					callback : {
						message : '营业收入在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}

				}
			},
			operatingCost : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '营业成本不能为空'
					},
					callback : {
						message : '营业成本在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			taxAndSurcharges : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '营业税金及附加不能为空'
					},
					callback : {
						message : '营业税金及附加在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			salesExpense : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '销售费用不能为空'
					},
					callback : {
						message : '销售费用在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			managementExpense : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '管理费用不能为空'
					},
					callback : {
						message : '管理费用在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			financialExpense : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '财务费用不能为空'
					},
					callback : {
						message : '财务费用在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			impairmentLosses : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '资产减值损失不能为空'
					},
					callback : {
						message : '资产减值损失在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			changesInFairValueGain : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '公允价值变动收益不能为空'
					},
					callback : {
						message : '公允价值变动收益在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			investmentGain : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '投资收益不能为空'
					},
					callback : {
						message : '投资收益在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			associatesAndJointVenturesGain : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '对联营企业和合营企业的投资收益不能为空'
					},
					callback : {
						message : '对联营企业和合营企业的投资收益在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			nonOperatingGain : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '营业外收入不能为空'
					},
					callback : {
						message : '营业外收入在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			nonOperatingExpense : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '营业外支出不能为空'
					},
					callback : {
						message : '营业外支出在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			nonCurrentAssetsLoss : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '非流动资产处置净损失不能为空'
					},
					callback : {
						message : '非流动资产处置净损失在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			incomeTaxExpense : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '所得税费用不能为空'
					},
					callback : {
						message : '所得税费用在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			earningsPerShare : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '每股收益不能为空'
					},
					callback : {
						message : '每股收益在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			basicEarningsPerShare : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '基本每股收益不能为空'
					},
					callback : {
						message : '基本每股收益在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			dilutedEarningsPerShare : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '稀释每股收益不能为空'
					},
					callback : {
						message : '稀释每股收益在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			mainRevenueGrowthAmount : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '主营业务收入增长额不能为空'
					},
					callback : {
						message : '主营业务收入增长额在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			growthRate : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '增长率不能为空'
					},
					callback : {
						message : '增长率在-10000-10000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -10000 && parseFloat(value) <= 10000);
						}
					}
				}
			},
			operatingProfitGrowthAmount : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '营业利润增长额不能为空'
					},
					callback : {
						message : '营业利润增长额在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			operatingProfitGrowthRate : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '营业利润增长率不能为空'
					},
					callback : {
						message : '营业利润增长率在-10000~10000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -10000 && parseFloat(value) <= 10000);
						}
					}
				}
			},
			netProfitGrowthAmount : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '净利润增长额不能为空'
					},
					callback : {
						message : '净利润增长额在-1000000000~1000000000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
						}
					}
				}
			},
			netProfitGrowthRate : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					notEmpty : {
						message : '净利润增长率不能为空'
					},
					callback : {
						message : '净利润增长率在-10000~10000之间',
						callback : function(value, validator) {
							return value == ""
									|| (parseFloat(value) >= -10000 && parseFloat(value) <= 10000);
						}
					}
				}
			},
			financialPhone : {
				validators : {
					notEmpty : {
						message : '手机号码不能为空'
					},
					regexp : {
						regexp : /^1[3|5|8|4|7]{1}[0-9]{9}$/,
						message : '请输入正确的11位手机号码'
					}
				}
			}

		}
	}).on('success.form.bv', function(e) {
		e.preventDefault();
		saveFun('profit');
		$(e.target).bootstrapValidator('resetForm', true);
	});

	$('#cashflowForm').bootstrapValidator({
		message : 'This value is not valid',
		excluded : ':disabled',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			incomeFromSellingAndOffering : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},

			taxBeReturned : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			otherCapitalAboutTheActivity : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			expendOfSellCommodity : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			expendOfPayToStaffs : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			paymentsOfTaxes : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			therExpendOfActivity : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			incomeFromWithdrawInvestment : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			otherCashReceivedInvestActivity : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			cashOfFixedIntangibleOtherLong : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			cashFromDisposalOtherBusiness : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			cashFromInvestIncome : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			cashOfFixedIntangibleLong : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			expenditureOfInvest : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			cashPaidForBusinessSubsidiaries : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			expendOfActivityAboutInvestment : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			incomeFromAbsorbInvestment : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			incomeFromObtainBorrowMoney : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			otherIncomeFromRaiseMoney : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			expendOfRepaymentOfDept : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			cashOfDividendsProfitInterest : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			otherExpendActivityRaiseMoney : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			influenceFluctuationCash : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			influenceFluctuationCash : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			margin : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			preparationOfDevaluation : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			depreciationOfFixed : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			amortizationOfIntangible : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			amortizationOfLong : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			lossFromDisposal : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			lossOfFixed : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			changeInFairValueLoss : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			financialExpenses : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			investmentLoss : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			decreaseInDeferredTax : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			increaseInDeferredTaxLiabilities : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			decreaseInInventories : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			decreaseInOperatingReceivables : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			increaseInOperatingPayables : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			other : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			debtTurnIntoCapital : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			convertibleBonds : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			theLeasedAssets : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			closeBalanceOfCash : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			openBalanceOfCash : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			closeBalanceOfCashEquivalents : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			},
			openBalanceOfCashEquivalents : {
				validators : {
					numeric : {
						message : '只能输入数字'
					},
					callback : {
						message : '金额在-1000000000.00~1000000000.00之间',
						callback : function(value, validator) {
							return parseFloat(value) > -1000000000
									&& parseFloat(value) < 1000000000;
						}
					}
				}
			}
		}
	}).on('success.form.bv', function(e) {
		e.preventDefault();
		saveFun('cashflow');
		$(e.target).bootstrapValidator('resetForm', true);
	});

	$('#bankRecForm').bootstrapValidator({
		message: 'This value is not valid',
		excluded: 'disabled',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			accountBank: {
				validators: {
					notEmpty: {
						message: '开户行不能为空'
					}
				}
			},
			accountName: {
				validators: {
					notEmpty: {
						message: '户名不能为空'
					}
				}
			},
			account: {
				validators: {
					notEmpty: {
						message: '账号不能为空'
					},numeric: {
						message: '只能输入数字'
					}, stringLength: {
						min:18,
						max:18,
						message: '长度为18'
					},regexp: {
						regexp: /^[1-9]\d*$/,
						message: '只能输入正整数'
					}
				}
			},
			debitAmount: {
				validators: {
					numeric: {
						message: '借方发生金额只能输入数字'
					},
					regexp: {
						regexp: /^[1-9]\d*$/,
						message: '只能输入正整数'
					},
					callback: {  
						message: '在0~1000000000之间',  
						callback: function(value, validator) { 
							return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=1000000000);
						}  
					} 
				}
			},
			creditAmount: {
				validators: {
					numeric: {
						message: '贷方发生金额只能输入数字'
					},
					regexp: {
						regexp: /^[1-9]\d*$/,
						message: '只能输入正整数'
					},
					callback: {  
						message: '注册资本在0~1000000000之间',  
						callback: function(value, validator) { 
							return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=1000000000);
						}  
					}
				}
			}
		}
	}).on('success.form.bv', function (e) {
		// Prevent form submission
		e.preventDefault();
		saveFun('bankRec');
		$(e.target).bootstrapValidator('resetForm', true);
	});

	$('#taxReturnsForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  purchasesTax: {
	              validators: {
	            	  notEmpty: {
							message: '进项税额不能为空'
						},
	            	  numeric : {
							message : '只能输入数字'
						},
	            	  callback : {
							message : '进项税额在-1000000000~1000000000之间',
							callback : function(value, validator) {
								return value == ""
										|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
							}
	            	  }
	              }
	          }, 
	          salesTax: {
	              validators: {
	            	  notEmpty: {
							message: '销项税额不能为空'
						},
	            	  numeric : {
							message : '只能输入数字'
						},
	            	  callback : {
							message : '销项税额在-1000000000~1000000000之间',
							callback : function(value, validator) {
								return value == ""
										|| (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
							}
	            	  }
	              }
	          },
	         
	        },
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			saveFun('taxReturns');
			$(e.target).bootstrapValidator('resetForm', true);
		});	
}