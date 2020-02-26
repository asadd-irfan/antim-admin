import { Component, OnInit } from '@angular/core';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddNotification } from 'app/store/actions/admin.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, AdminState } from '../../store/app.states';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-static-pages',
  templateUrl: './static-pages.component.html',
  styleUrls: ['./static-pages.component.scss']
})
export class StaticPagesComponent implements OnInit {
  homeId: any;
  lenderId: any;
  borrowerId: any;
  contactUsId: any;
  whoWeAreId: any;
  TermsConditionsId: any;
  FAQLenderId: any;
  FAQBorrowerId: any;

  options: IndividualConfig;
  getState: Observable<any>;
  Home: any = {
    page_name: 'Home Page',
    Section1: {
      section_name: 'Fast Approval',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section2: {
      section_name: 'Open Purchases',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section3: {
      section_name: 'Immediant Fund',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section4: {
      section_name: 'We made it easy for you',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section5: {
      section_name: 'Responsive layout',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    }
  };

  Who_We_Are: any = {
    page_name: 'Who We Are Page',
    Section1: {
      section_name: 'Who We Are',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section2: {
      section_name: 'Our Vision',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section3: {
      section_name: 'Our Mission',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section4: {
      section_name: 'Our Promises',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section5: {
      section_name: 'The Team',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    }

  };
  LenderPage: any = {
    page_name: 'Lender Page',
    Section1: {
      section_name: 'Purchase of various products (in installments).',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section2: {
      section_name: 'Small borrowing amounts',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section3: {
      section_name: 'Low and steady profit margin',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section4: {
      section_name: 'Product delivery service.',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section5: {
      section_name: 'Electronic financing process.',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section6: {
      section_name: 'Step One',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section7: {
      section_name: 'Step Two',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section8: {
      section_name: 'Step Three',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section9: {
      section_name: 'Terms of application',
      TitleEn: '',
      TitleAr: '',
      Content1En: '',
      Content2En: '',
      Content3En: '',
      Content4En: '',
      Content1Ar: '',
      Content2Ar: '',
      Content3Ar: '',
      Content4Ar: '',
    },
    Section10: {
      section_name: 'Required Documents',
      TitleEn: '',
      TitleAr: '',
      Content1En: '',
      Content2En: '',
      Content3En: '',
      Content1Ar: '',
      Content2Ar: '',
      Content3Ar: '',
    },
    Section11: {
      section_name: 'Application criteria',
      TitleEn: '',
      TitleAr: '',
      Content1En: '',
      Content2En: '',
      Content3En: '',
      Content4En: '',
      Content5En: '',
      Content1Ar: '',
      Content2Ar: '',
      Content3Ar: '',
      Content4Ar: '',
      Content5Ar: ''
    }
  };

  BorrowerPage: any = {
    page_name: 'Borrower Page',
    Section1: {
      section_name: 'Purchase of various products (in installments).',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section2: {
      section_name: 'Small borrowing amounts',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section3: {
      section_name: 'Low and steady profit margin',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section4: {
      section_name: 'Product delivery service.',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section5: {
      section_name: 'Electronic financing process.',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section6: {
      section_name: 'Step One',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section7: {
      section_name: 'Step Two',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section8: {
      section_name: 'Step Three',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section9: {
      section_name: 'Terms of application',
      TitleEn: '',
      TitleAr: '',
      Content1En: '',
      Content2En: '',
      Content3En: '',
      Content4En: '',
      Content1Ar: '',
      Content2Ar: '',
      Content3Ar: '',
      Content4Ar: '',
    },
    Section10: {
      section_name: 'Required Documents',
      TitleEn: '',
      TitleAr: '',
      Content1En: '',
      Content2En: '',
      Content3En: '',
      Content1Ar: '',
      Content2Ar: '',
      Content3Ar: '',
    },
    Section11: {
      section_name: 'Application criteria',
      TitleEn: '',
      TitleAr: '',
      Content1En: '',
      Content2En: '',
      Content3En: '',
      Content4En: '',
      Content5En: '',
      Content1Ar: '',
      Content2Ar: '',
      Content3Ar: '',
      Content4Ar: '',
      Content5Ar: ''
    }
  };

  Contact_Us: any = {
    page_name: 'Contact Us Page',
    Section1: {
      section_name: 'Contact Us',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section2: {
      section_name: 'Antim Care: Email',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section3: {
      section_name: 'Customers Service: Email',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section4: {
      section_name: 'Customers Service: Mobile Number',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section5: {
      section_name: 'From within the Kingdom: Mobile Number',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section6: {
      section_name: 'From outside the Kingdom: Mobile Number',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section7: {
      section_name: 'Marketing & Sales: Mobile Number',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },

  };
  TermsConditions: any = {
    page_name: 'Terms And Conditions Page',
    Section: {
      section_name: 'Terms And Conditions',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: '',
      ParagraphEn: '',
      ParagraphAr: '',
      EnBulletPoints: [{
        bulletPoint: ''
      }],
      ArBulletPoints:  [{
        bulletPoint: ''
      }],
    },
  };
  FAQ_Lender: any = {
    page_name: 'FAQ Lender Page',
    Section: {
      TitleEn: '',
      TitleAr: '',
      En_QA: [{
        EnQuestion: '',
        EnAnswer: ''
      }],
      Ar_QA:  [{
        ArQuestion: '',
        ArAnswer: ''
      }],
    }
  }
  FAQ_Borrower: any = {
      page_name: 'FAQ Borrower Page',
      Section: {
        TitleEn: '',
        TitleAr: '',
        En_QA: [{
          EnQuestion: '',
          EnAnswer: ''
        }],
        Ar_QA:  [{
          ArQuestion: '',
          ArAnswer: ''
        }],
      }
    }

  constructor(
    private adminApiService: AdminAPIsService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
    private toastr: ToastrService,
  ) {
    this.getState = this.store.select(AdminState);
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  ngOnInit() {
    this.spinner.show();
    this.adminApiService.getStaticPageByKey("HomePage").subscribe(res => {
      // console.log(res);
      this.homeId = res.result.id;
      this.spinner.hide();
      this.Home = JSON.parse(res.result.sections);
      // console.log(this.Home)
    }, err => {
      this.spinner.hide();
      console.log(err);
    })
    this.adminApiService.getStaticPageByKey("WhoWeArePage").subscribe(res => {
      // console.log(res);
      this.whoWeAreId = res.result.id;
      this.Who_We_Are = JSON.parse(res.result.sections);
      // console.log(this.Who_We_Are)
    }, err => {
      console.log(err);
    })
    this.adminApiService.getStaticPageByKey("LenderPage").subscribe(res => {
      // console.log(res);
      this.lenderId = res.result.id;
      this.LenderPage = JSON.parse(res.result.sections);
      // console.log(this.LenderPage)
    }, err => {
      console.log(err);
    })
    this.adminApiService.getStaticPageByKey("BorrowerPage").subscribe(res => {
      // console.log(res);
      this.borrowerId = res.result.id;
      this.BorrowerPage = JSON.parse(res.result.sections);
      // console.log(this.BorrowerPage)
    }, err => {
      console.log(err);
    })
    this.adminApiService.getStaticPageByKey("ContactUsPage").subscribe(res => {
      // console.log(res);
      this.contactUsId = res.result.id;
      this.Contact_Us = JSON.parse(res.result.sections);
      // console.log(this.Contact_Us)
    }, err => {
      console.log(err);
    })
    this.adminApiService.getStaticPageByKey("FAQLenderPage").subscribe(res => {
      // console.log(res);
      this.FAQLenderId = res.result.id;
      this.FAQ_Lender = JSON.parse(res.result.sections);
      // console.log(this.FAQ_Lender)
    }, err => {
      console.log(err);
    })
    this.adminApiService.getStaticPageByKey("FAQBorrowerPage").subscribe(res => {
      // console.log(res);
      this.FAQBorrowerId = res.result.id;
      this.FAQ_Borrower = JSON.parse(res.result.sections);
      // console.log(this.FAQ_Borrower)
    }, err => {
      console.log(err);
    })

    this.spinner.show();
    this.adminApiService.getStaticPageByKey("TermsAndConditionsPage").subscribe(res => {
      // console.log(res);
      this.TermsConditionsId = res.result.id;
      this.spinner.hide();
      this.TermsConditions = JSON.parse(res.result.sections);
      // console.log(this.TermsConditions)
    }, err => {
      this.spinner.hide();
      console.log(err);
    })

  }
  saveHomePage() {
    this.spinner.show();
    this.adminApiService.addOrUpdateStaticPage({
      "PageKey": "HomePage",
      "PageId": this.homeId,
      "Sections": JSON.stringify(this.Home)
    }).subscribe(res => {
      this.spinner.hide();
      this.showSuccessToast('', ' "Home" Page Edited Successfully', 'success');
      console.log(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
    })

  }
  saveWhoWeArePage() {
    this.spinner.show();
    this.adminApiService.addOrUpdateStaticPage({
      "PageKey": "WhoWeArePage",
      "PageId": this.whoWeAreId,
      "Sections": JSON.stringify(this.Who_We_Are)
    }).subscribe(res => {
      this.spinner.hide();
      this.showSuccessToast('', ' "Who We Are" Page Edited Successfully', 'success');
      console.log(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
    })
  }

  saveLenderPage() {
    this.spinner.show();
    this.adminApiService.addOrUpdateStaticPage({
      "PageKey": "LenderPage",
      "PageId": this.lenderId,
      "Sections": JSON.stringify(this.LenderPage)
    }).subscribe(res => {
      this.spinner.hide();
      this.showSuccessToast('', ' "Lender" Page Edited Successfully', 'success');
      console.log(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
    })

  }
  saveBorrowerPage() {
    this.spinner.show();
    this.adminApiService.addOrUpdateStaticPage({
      "PageKey": "BorrowerPage",
      "PageId": this.borrowerId,
      "Sections": JSON.stringify(this.BorrowerPage)
    }).subscribe(res => {
      this.spinner.hide();
      this.showSuccessToast('', ' "Borrower" Page Edited Successfully', 'success');
      console.log(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
    })
  }

  saveContactPage() {
    this.spinner.show();
    this.adminApiService.addOrUpdateStaticPage({
      "PageKey": "ContactUsPage",
      "PageId": this.contactUsId,
      "Sections": JSON.stringify(this.Contact_Us)
    }).subscribe(res => {
      this.spinner.hide();
      this.showSuccessToast('', ' "Contact Us" Page Edited Successfully', 'success');
      console.log(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
    })
  }
  saveTermsConditionsPage() {
    this.spinner.show();
    this.adminApiService.addOrUpdateStaticPage({
      "PageKey": "TermsAndConditionsPage",
      "PageId": this.TermsConditionsId,
      "Sections": JSON.stringify(this.TermsConditions)
    }).subscribe(res => {
      this.spinner.hide();
      this.showSuccessToast('', ' "Terms and Conditions" Page Edited Successfully', 'success');
      console.log(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
    })

  }
  saveFAQLenderPage() {
    this.spinner.show();
    this.adminApiService.addOrUpdateStaticPage({
      "PageKey": "FAQLenderPage",
      "PageId": this.FAQLenderId,
      "Sections": JSON.stringify(this.FAQ_Lender)
    }).subscribe(res => {
      this.spinner.hide();
      this.showSuccessToast('', ' "FAQ Lender" Page Edited Successfully', 'success');
      console.log(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
    })

  }
  saveFAQBorrowerPage() {
    this.spinner.show();
    this.adminApiService.addOrUpdateStaticPage({
      "PageKey": "FAQBorrowerPage",
      "PageId": this.FAQBorrowerId,
      "Sections": JSON.stringify(this.FAQ_Borrower)
    }).subscribe(res => {
      this.spinner.hide();
      this.showSuccessToast('', ' "FAQ Borrower" Page Edited Successfully', 'success');
      console.log(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
    })

  }
  addMoreBulletPointEn() {
    this.TermsConditions.Section.EnBulletPoints.push({
      bulletPoint: ''
    });
  }
  removeBulletPointEn(i: number) {
    this.TermsConditions.Section.EnBulletPoints.splice(i, 1);
  }
  addMoreBulletPointAr() {
    this.TermsConditions.Section.ArBulletPoints.push({
      bulletPoint: ''
    });
  }
  removeBulletPointAr(i: number) {
    this.TermsConditions.Section.ArBulletPoints.splice(i, 1);
  }
  addEn_QALender() {
    this.FAQ_Lender.Section.En_QA.push({
      EnQuestion: '',
      EnAnswer: ''
  });
  }
  removeEn_QALender(i: number) {
    this.FAQ_Lender.Section.En_QA.splice(i, 1);
  }
  addAr_QALender() {
    this.FAQ_Lender.Section.Ar_QA.push({
      ArQuestion: '',
      ArAnswer: ''
});
  }
  removeAr_QALender(i: number) {
    this.FAQ_Lender.Section.Ar_QA.splice(i, 1);
  }
  addEn_QABorrower() {
    this.FAQ_Borrower.Section.En_QA.push({
      EnQuestion: '',
      EnAnswer: ''
  });
  }
  removeEn_QABorrower(i: number) {
    this.FAQ_Borrower.Section.En_QA.splice(i, 1);
  }
  addAr_QABorrower() {
    this.FAQ_Borrower.Section.Ar_QA.push({
      ArQuestion: '',
      ArAnswer: ''
});
  }
  removeAr_QABorrower(i: number) {
    this.FAQ_Borrower.Section.Ar_QA.splice(i, 1);
  }

}
